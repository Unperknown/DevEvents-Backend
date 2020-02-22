const { query } = require('./query')
const { mutation } = require('./mutation')
const { eventType, crawledType, requestorType } = require('./types')

const typeDefs = [query, mutation, eventType, crawledType, requestorType]

module.exports = {
  typeDefs,
}