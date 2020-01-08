const Router = require('koa-router')

const api = new Router()

api.get('/', (ctx, next) => {
    ctx.body = 'GET /'
})

module.exports = api