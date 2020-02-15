const puppeteer = require('puppeteer')
const cheerio = require('cheerio')

const FESTA_URL = 'https://www.festa.io/events'
const Event = require('models/event')

exports.getAllEventData = async (ctx) => {
  let links = await fetchAllLinks()
  let events = []

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

  let $ = await crawlRenderedHTMLFromURL(FESTA_URL)

  $('div[id="root"] > div > div > div[class*="Desktop"] > div > div > div')
    .each((index, element) => {
      let href = $(element)
        .find('div > div > a')
        .attr('href')
      
      let id = href.substring(href.indexOf('/', 1) + 1)

      links.push(FESTA_URL + `/${id}`)
    })

  return links
}

const fetchDataFromURL = async (url) => {
  let $ = await crawlRenderedHTMLFromURL(url)

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

const crawlRenderedHTMLFromURL = async (url) => {
  console.log('Crawling...')

  let html = ''

  await puppeteer
    .launch()
    .then(browser => {
      return browser.newPage()
    })
    .then(page => {
      return page.goto(url).then(() => {
        return page.content()
      })
    })
    .then(_html => {
      html = _html
    })
    .catch(err => {
      console.log(err)
    })

  console.log('Successfully Crawled Data!')

  let $ = cheerio.load(html)

  return $
}

const isEmptyArray = array => {
  return Array.isArray(array) && array.length
}