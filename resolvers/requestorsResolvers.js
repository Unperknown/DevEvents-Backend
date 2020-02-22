const _ = require('lodash')

const { ApolloError } = require('apollo-server-koa')

const { Requestor } = require('models')

const requestorsResolvers = {
  Query: {
    requestors: async () => await Requestor.find({}),
  },
}

module.exports = {
  requestorsResolvers,
}