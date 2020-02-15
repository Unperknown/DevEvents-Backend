const puppeteer = require('puppeteer')
const cheerio = require('cheerio')

const FESTA_URL = 'https://www.festa.io'
const Event = require('models/event')

exports.getAllEventData = async (ctx) => {
  let events = []
  let links = await fetchAllLinks()

  for (let i in links) {
    let event = await fetchDataFromURL(links[i])

    events.push(event)
  }

  let fetched = await Event.fetchEventsData(events)

  ctx.assert(isEmptyArray(fetched), 'Crawled events\' data weren\'t completely fetched to database.')

  ctx.body = events
}

const fetchAllLinks = async () => {
  let links = []

  let $ = await cheeriofiedHTML(FESTA_URL + '/events')

  $('div[id="root"] > div > div > div[class*="Desktop"] > div > div > div')
    .each((index, element) => {
      let href = $(element)
        .find('div > div > a')
        .attr('href')

      links.push(FESTA_URL + href)
    })

  return links
}

const fetchDataFromURL = async (url) => {
  let $ = await cheeriofiedHTML(url)

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

const cheeriofiedHTML = async url => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  const html = await page.goto(url)
    .then(async () => await page.content())
    .catch(err => console.log(err))

  await browser.close()

  const $ = cheerio.load(html)

  return $
}

const isEmptyArray = array => {
  return Array.isArray(array) && array.length
}