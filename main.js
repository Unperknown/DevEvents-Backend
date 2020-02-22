require('dotenv').config()

const fs = require('fs')
const path = require('path')
const https = require('https')

const Koa = require('koa')
const Router = require('koa-router')
const koaBody = require('koa-bodyparser')
const cors = require('@koa/cors')

const mongoose = require('mongoose')

const { ApolloServer } = require('apollo-server-koa')
const { typeDefs } = require('./typeDefs')
const { resolvers } = require('./resolvers')

const config = {
  hostname: process.env.HOSTNAME || 'CENSORED',
  mongodb_uri: process.env.MONGODB_URI || `mongodb://${process.env.HOSTNAME}:27017/DevEvents`,
  https: {
    port: process.env.HTTPS_PORT || 443,
    options: {
      key: fs.readFileSync(path.resolve(process.cwd(), `certs/${process.env.HOSTNAME}.key`), 'utf8').toString(),
      cert: fs.readFileSync(path.resolve(process.cwd(), `certs/${process.env.HOSTNAME}.crt`), 'utf8').toString(),
    },
  }
}

const app = new Koa()
const router = new Router()
const server = new ApolloServer({
  typeDefs,
  resolvers,
})

mongoose.Promise = global.Promise

mongoose.connect(config.mongodb_uri, {
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

https.createServer(config.https.options, app.callback())
  .listen(config.https.port, () => {
  console.log(`Server is ready at https://${config.hostname}`)
  console.log(`GraphiQL is ready at https://${config.hostname}${server.graphqlPath}`)
})

app.on('error', err => {
  log.error('Server Error', err)
})
