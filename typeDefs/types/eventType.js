const { gql } = require('apollo-server-koa');

const eventType = gql`
  type Event {
    title: String
    date: String
    location: String
    price: String,
    imageLink: String,
    hyperLink: String,
    isValid: Boolean
  }

  input EventInput {
    title: String
    date: String
    location: String
    price: String,
    imageLink: String,
    hyperLink: String,
    isValid: Boolean
  }
`;

module.exports = {
  eventType,
}