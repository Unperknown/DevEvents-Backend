const { gql } = require('apollo-server-koa')

const query = gql`
  type Query {
    events: [Event]
  }
`

module.exports = {
  query,
}