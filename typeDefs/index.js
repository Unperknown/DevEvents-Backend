const { query } = require('./query')
const { mutation } = require('./mutation')
const { eventType } = require('./types')

const typeDefs = [query, mutation, eventType]

module.exports = {
  typeDefs,
}