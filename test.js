require('dotenv').config()

const Koa = require('koa')
const Router = require('koa-router')
const koaBody = require('koa-bodyparser')
const cors = require('@koa/cors')

const mongoose = require('mongoose')

const { ApolloServer } = require('apollo-server-koa')
const { typeDefs } = require('./typeDefs')
const { resolvers } = require('./resolvers')

const config = {
  hostname: process.env.HOSTNAME || 'localhost',
  admin_code: process.env.ADMIN_CODE || 'CENSORED',
  mongodb_uri: process.env.MONGODB_URI || `mongodb://localhost:27017/DevEvents`,
  port: process.env.PORT || 8080,
}

const app = new Koa()
const router = new Router()
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ ctx }) => {
    const entered = ctx.request.headers['authentication'] || ''
    let response = {
      authenticated: false
    }

    if (entered === config.admin_code) {
      response.authenticated = true
    }

    return response
  },
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

app.listen(config.port, () => {
  console.log(`Server is ready at http://${config.hostname}:${config.port}`)
  console.log(`GraphiQL is ready at http://${config.hostname}:${config.port}${server.graphqlPath}`)
})

app.on('error', err => {
  log.error('Server Error', err)
})
