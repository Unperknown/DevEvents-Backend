const axios = require('axios')
const cheerio = require('cheerio')

const url = 'https://www.festa.io/events'

const Event = require('models/event')

const crawlData = async (url) => {
  console.log('Crawling...')

  let data = ''

  await axios(url)
    .then(res => {
      const html = res.data

      console.log(html)

      data = html
    })
    .catch(err => {
      console.log(err)
    })

  return data
}

exports.getAllEventData = async (ctx) => {
  let response = await crawlData(url)

  ctx.body = `<xmp>${response}</xmp>`
}