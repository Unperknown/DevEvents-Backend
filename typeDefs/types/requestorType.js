const { gql } = require('apollo-server-koa')

const requestorType = gql`
  type Requestor {
    name: String
  }
`

module.exports = {
  requestorType,
}