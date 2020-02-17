const FESTA_URL = 'https://www.festa.io'

const cheerio = require('cheerio')

const Browser = require('lib/browser')

const EventSchema = require('models/event')

exports.getAllEventData = async function(ctx) {
  console.time('Whole Crawling Process')
  let events = await crawlEventData()
  console.timeEnd('Whole Crawling Process')

  let fetched = await EventSchema.fetchEventsData(events)

  ctx.assert(isEmptyArray(fetched), 'Crawled events\' data weren\'t completely fetched to database.')

  ctx.body = events
}

async function crawlEventData() {
  console.time('Launching Browser')
  await Browser.launch()
  console.timeEnd('Launching Browser')

  console.time('Get Links')
  let links = (await Browser.processPage(FESTA_URL + '/events', getLinks))[0]
  console.timeEnd('Get Links')

  console.log('Gotten Links')
  console.log(links)

  console.time('Crawling Data')
  let events = await Browser.processPage(links, fetchData)
  console.timeEnd('Crawling Data')

  console.time('Closing Browser')
  await Browser.close()
  console.timeEnd('Closing Browser')

  return events
}

async function getLinks(html) {
  let links = []

  let $ = cheerio.load(html)

  $('div[id="root"] > div > div > div[class*="Desktop"] > div > div > div')
    .each((index, element) => {
      let href = $(element)
        .find('div > div > a')
        .attr('href')

      links.push(FESTA_URL + href)
    })

  return links
}

async function fetchData(html) {
  let $ = cheerio.load(html)

  console.log(html)

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