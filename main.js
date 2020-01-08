require('dotenv').config()

const PORT = process.env.PORT || 8080

const Koa = require('koa')
const Router = require('koa-router')

const app = new Koa()
const router = new Router()

const cors = require('@koa/cors')

const api = require('./api')

router.use('', api.routes())

app.use(cors())

app.use(router.routes()).use(router.allowedMethods())

app.listen(PORT, () => {
    console.log(`Server is listening to port ${PORT}`)
})

app.on('error', err => {
    log.error('Server Error', err)
})