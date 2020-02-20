const cheerio = require('cheerio')
const { Cluster } = require('puppeteer-cluster')

const FestaCrawler = {
  fetch: async function () {
    let events = await crawlData()

    return events
  }
}

module.exports = {
  FestaCrawler,
}

async function crawlData() {
  const cluster = await Cluster.launch({
    concurrency: Cluster.CONCURRENCY_CONTEXT,
    maxConcurrency: 3,
  })

  const links = await cluster.execute('https://www.festa.io/events', fetchLinks)

  let events = []

  await cluster.task(async ({ page, data: url }) => {
    await page.goto(url)
    await page.waitForSelector('div[id="root"] > div > div[class*="DesktopView"]')

    let html = await page.content()
    events.push({ html: html, hyperLink: url })
  })

  links.map(link => cluster.queue(link))

  await cluster.idle()
  await cluster.close()

  events = events.map(event => fetchData(event))

  return events
}

async function fetchLinks({ page, data: url }) {
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

function fetchData({ html: html, hyperLink: url }) {
  let $ = cheerio.load(html)

  let foundInfo = $('div[id="root"] > div > div[class*="DesktopView"]')

  let title = foundInfo.find('h1[class*="Title"]').text()
  let date = foundInfo.find('div[class*="DateInfo"] > div[class*="MetaText"]').text()
  let location = foundInfo.find('div[class*="VenueText"]').text()
  let price = foundInfo.find('div[class*="Price"]').text()
  let imageLink = foundInfo.find('div[class*="MainImage"]').attr('src')
  let isValid = !foundInfo.find('div[class*="TicketBuyButton"] > a').prop('disabled')

  let event = {
    title: title,
    date: date,
    location: location,
    price: price,
    imageLink: imageLink,
    hyperLink: url,
    isValid: isValid
  }

  return event
}
