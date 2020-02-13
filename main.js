require('dotenv').config()

const PORT = process.env.PORT || 8080
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/'

const Koa = require('koa')
const Router = require('koa-router')
const koaBody = require('koa-bodyparser')

const mount = require('koa-mount')
const graphqlHTTP = require('koa-graphql')
const schema = require('./graphql/schema')

const mongoose = require('mongoose')

mongoose.Promise = global.Promise

mongoose.connect(MONGODB_URI, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(response => {
  console.log('Successfully connected to mongodb')
}).catch(e => {
  console.error(e)
})

const app = new Koa()

const router = new Router()

const cors = require('@koa/cors')

app.use(cors())
  .use(koaBody())
  .use(router.routes())
  .use(router.allowedMethods())

app.use(mount('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true
})))

app.listen(PORT, () => {
  console.log(`Server is ready at localhost:${PORT}`)
})

app.on('error', err => {
  log.error('Server Error', err)
})