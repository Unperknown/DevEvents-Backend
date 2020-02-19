const { query } = require("./query")
const { eventType } = require("./types")

const typeDefs = [query, eventType]

module.exports = {
  typeDefs,
}