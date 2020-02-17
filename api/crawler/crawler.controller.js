const FESTA_URL = 'https://www.festa.io'

const cheerio = require('cheerio')
const { Cluster } = require('puppeteer-cluster')

const EventSchema = require('models/event')

exports.getAllEventData = async function (ctx) {
  console.time('Whole Crawling Process')
  let events = await crawlEventData()
  console.timeEnd('Whole Crawling Process')

  let fetched = await EventSchema.fetchEventsData(events)

  ctx.assert(isEmptyArray(fetched), 'Crawled events\' data weren\'t completely fetched to database.')

  ctx.body = events
}

async function crawlEventData() {
  const cluster = await Cluster.launch({
    concurrency: Cluster.CONCURRENCY_CONTEXT,
    maxConcurrency: 5,
  })

  const links = await cluster.execute(FESTA_URL + '/events', fetchLinks)
  const htmls = []

  await cluster.task(async ({ page, data: url }) => {
    await page.goto(url, { waitUntil: 'networkidle2' })
    htmls.push(await page.content())
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

  let $ = cheerio.load(await page.content())

  $('div[id="root"] > div > div > div[class*="Desktop"] > div > div > div')
  .each((index, element) => {
    let href = $(element)
      .find('div > div > a')
      .attr('href')

    links.push(FESTA_URL + href)
  })

  return links
}

function fetchData(html) {
  let $ = cheerio.load(html)

  let foundInfo = $('div[id="root"] > div > div[class*="Desktop"]')

  let title = foundInfo.find('h1[class*="Title"]').text()
  let date = foundInfo.find('div[class*="DateInfo"] > div[class*="MetaText"]').text()
  let location = foundInfo.find('div[class*="VenueText"]').text()
  let price = foundInfo.find('div[class*="Price"]').text()

  let event = {
    title: title,
    date: date,
    location: location,
    price: price
  }

  return event
}

function isEmptyArray(array) {
  return Array.isArray(array) && array.length
}