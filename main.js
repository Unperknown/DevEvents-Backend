require('dotenv').config()

const fs = require('fs')
const path = require('path')
const http2 = require('http2')
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
  http2: {
    port: process.env.HTTP2_PORT || 80,
    options: {
      key: fs.readFileSync(path.resolve(process.cwd(), `certs/${process.env.HOSTNAME}.key`), 'utf8').toString(),
      cert: fs.readFileSync(path.resolve(process.cwd(), `certs/${process.env.HOSTNAME}.crt`), 'utf8').toString(),
    },
  },
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

http2.createServer(config.http2.options, app.callback())
  .listen(config.http2.port, () => {
    console.log(`HTTP Server is ready at http://${config.hostname}`)
    console.log(`HTTP GraphiQL is ready at http://${config.hostname}${server.graphqlPath}`)
  })

https.createServer(config.https.options, app.callback())
  .listen(config.https.port, () => {
    console.log(`HTTPS Server is ready at https://${config.hostname}`)
    console.log(`HTTPS GraphiQL is ready at https://${config.hostname}${server.graphqlPath}`)
  })

app.on('error', err => {
  log.error('Server Error', err)
})
