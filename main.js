require('dotenv').config()

const PORT = process.env.PORT || 8080
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/DevEvents'

const Koa = require('koa')

const Router = require('koa-router')
const koaBody = require('koa-bodyparser')
const cors = require('@koa/cors')

const mongoose = require('mongoose')

const { ApolloServer } = require('apollo-server-koa')
const { typeDefs } = require('./typeDefs')
const { resolvers } = require('./resolvers')

const app = new Koa()
const router = new Router()
const server = new ApolloServer({ typeDefs, resolvers })

mongoose.Promise = global.Promise

mongoose.connect(MONGODB_URI, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(response => {
  console.log('Successfully connected to mongoDB')
}).catch(e => {
  console.error(e)
})

server.applyMiddleware({ app })

app.use(cors())
  .use(koaBody())
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(PORT, () => {
  console.log(`Server is ready at localhost:${PORT}`)
  console.log(`GraphiQL is ready at localhost:${PORT}${server.graphqlPath}`)
})

app.on('error', err => {
  log.error('Server Error', err)
})
