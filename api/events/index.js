const Router = require('koa-router')

const events = new Router()

const eventsCtrl = require('./events.controller')

events.get('/events', eventsCtrl.getAllEvents)

module.exports = events