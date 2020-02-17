const cheerio = require('cheerio')
const { Cluster } = require('puppeteer-cluster')

const EventSchema = require('models/event')

exports.getAllEventData = async function (ctx) {
  let events = await crawlEventData()

  let fetched = await EventSchema.fetchEventsData(events)

  ctx.assert(isEmptyArray(fetched), 'Crawled events\' data weren\'t completely fetched to database.')

  ctx.body = events
}

async function crawlEventData() {
  const cluster = await Cluster.launch({
    concurrency: Cluster.CONCURRENCY_CONTEXT,
    maxConcurrency: 3,
  })

  const links = await cluster.execute('https://www.festa.io/events', fetchLinks)
  const htmls = []

  await cluster.task(async ({ page, data: url }) => {
    await page.goto(url)
    await page.waitForSelector('div[id="root"] > div > div[class*="DesktopView"]')

    let html = await page.content()
    htmls.push(html)
  })

  links.map(link => cluster.queue(link))

  await cluster.idle()
  await cluster.close()

  let events = htmls.map(html => fetchData(html))

  return events
}

const fetchLinks = async ({ page, data: url }) => {
  let links = []

  await page.goto(url)
  await page.waitForSelector('div[id="root"] > div > div > div[class*="DesktopView"]')
  
  let html = await page.content()
  let $ = cheerio.load(html)

  $('div[id="root"] > div > div > div[class*="DesktopView"] > div > div > div > div > div > a')
    .each((index, element) => {
      let href = $(element).attr('href')
      links.push('https://www.festa.io' + href)
    })

  return links
}

function fetchData(html) {
  let $ = cheerio.load(html)

  let foundInfo = $('div[id="root"] > div > div[class*="DesktopView"]')

  let title = foundInfo.find('h1[class*="Title"]').text()
  let date = foundInfo.find('div[class*="DateInfo"] > div[class*="MetaText"]').text()
  let location = foundInfo.find('div[class*="VenueText"]').text()
  let price = foundInfo.find('div[class*="Price"]').text()
  let imageLink = foundInfo.find('div[class*="MainImage"]').attr('src')

  let event = {
    title: title,
    date: date,
    location: location,
    price: price,
    imageLink: imageLink
  }

  return event
}

function isEmptyArray(array) {
  return Array.isArray(array) && array.length
}