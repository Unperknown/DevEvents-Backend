const puppeteer = require('puppeteer')

module.exports = {
  browser: null,
  launch: async () => {
    this.browser = await puppeteer.launch()
  },
  processPage: async (url, process) => {
    if (!Array.isArray(url)) {
      url = [url]
    }

    let results = []

    for (let i = 0; i < url.length; i++) {
      let page = await this.browser.newPage()

      await page.goto(url[i], { waitUntil: 'networkidle2' })

      let html = await page.content()

      await page.close()

      let result = await process(html)

      results.push(result)
    }

    if (url.length === 1) {
      results = results[0]
    }

    return results
  },
  close: async () => {
    await this.browser.close()
  }
}