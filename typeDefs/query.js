const { gql } = require('apollo-server-koa')

const query = gql`
  type Query {
    crawled(id: String): Crawled
    crawleds: [Crawled]
    
    event(id: String): Event
    events: [Event]

    requestors: [Requestor]
  }
`

module.exports = {
  query,
}