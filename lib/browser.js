const puppeteer = require('puppeteer')

module.exports = {
  browser: null,
  page: null,
  launch: async () => {
    this.browser = await puppeteer.launch()
    this.page = await this.browser.newPage()
  },
  processPage: async (url, process) => {
    if (!Array.isArray(url)) {
      url = [url]
    }

    console.log('Forwarded URL')
    console.log(url)

    let results = []

    for (let i = 0; i < url.length; i++) {
      console.log(`About to crawl ${url[i]}!`)

      const html = await this.page.goto(url[i])
        .then(async () => await this.page.content())
        .catch(err => console.log(err))

      let result = await process(html)

      console.log(result)

      results.push(result)
    }
    
    return results
  },
  close: async () => {
    await this.browser.close()
  }
}