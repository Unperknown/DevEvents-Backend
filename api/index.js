const Router = require('koa-router')

const api = new Router()

const events = require('./events')

api.use('', events.routes())

module.exports = api