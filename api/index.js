const Router = require('koa-router')

const api = new Router()

const crawler = require('./crawler')

api.use('/crawl', crawler.routes())

module.exports = api