const { gql } = require('apollo-server-koa')

const crawledType = gql`
  type Crawled {
    title: String
    date: String
    location: String
    price: String
    imageLink: String
    hyperLink: String
    isValid: Boolean
  }

  input CrawledInput {
    title: String
    date: String
    location: String
    price: String
    imageLink: String
    hyperLink: String
    isValid: Boolean
  }
`

module.exports = {
  crawledType,
}