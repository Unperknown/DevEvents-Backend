const puppeteer = require('puppeteer')
const cheerio = require('cheerio')

const url = 'https://www.festa.io/events'

const Event = require('models/event')

const crawlData = async (url) => {
  console.log('Crawling...')

  let data = ''

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
    .then(html => {
      let $ = cheerio.load(html)

      let events = []

      $('div[id="root"] > div > div > div[class*="Desktop"] > div > div > div').each((index, element) => {
        let title = $(element).find('h3').text()
        let date = $(element).find('time').text()

        console.log(`Title: ${title}`)
        console.log(`Date: ${date}`)

        let info = {
          title: title,
          date: date
        }

        events.push(info)
      })

      data = events
    })
    .catch(err => {
      console.log(err)
    })

  return data
}

exports.getAllEventData = async (ctx) => {
  let data = await crawlData(url)

  ctx.body = data
}