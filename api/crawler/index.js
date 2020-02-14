const Router = require('koa-router')
const crawler = new Router()

const crawlerCtrl = require('./crawler.controller')

crawler.get('/', crawlerCtrl.getAllEventData)

module.exports = crawler