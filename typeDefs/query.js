const { gql } = require('apollo-server-koa')

const query = gql`
  type Query {
    event(id: String): Event
    events: [Event]
  }
`

module.exports = {
  query,
}