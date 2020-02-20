const { gql } = require('apollo-server-koa')

const mutation = gql`
  type Mutation {
    fetchCrawledData: [Crawled]

    addEvent(event: EventInput): Event
    updateEvent(id: String, event: EventInput): Event
    removeEvent(id: String): Event
  }
`

module.exports = {
  mutation,
}