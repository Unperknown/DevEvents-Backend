const { query } = require('./query')
const { mutation } = require('./mutation')
const { eventType, crawledType } = require('./types')

const typeDefs = [query, mutation, eventType, crawledType]

module.exports = {
  typeDefs,
}