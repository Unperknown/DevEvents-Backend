const Router = require('koa-router')

const api = new Router()

const crawler = require('./crawler')

api.use('/crawler', crawler.routes())

module.exports = api