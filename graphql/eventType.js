const graphql = require('graphql')

const { GraphQLObjectType, GraphQLString } = graphql

const EventType = new GraphQLObjectType({
  name: 'Event',
  fields: () => ({
    title: { type: GraphQLString },
    date: { type: GraphQLString },
    location: { type: GraphQLString },
    price: { type: GraphQLString },
    imageLink: { type: GraphQLString }
  })
})

module.exports = EventType