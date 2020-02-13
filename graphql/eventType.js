const graphql = require('graphql')

const { GraphQLObjectType, GraphQLInt, GraphQLString } = graphql

const EventType = new GraphQLObjectType({
  name: 'Event',
  fields: () => ({
    title: { type: GraphQLString },
    date: { type: GraphQLString },
    location: { type: GraphQLString },
    price: { type: GraphQLInt }
  })
})

module.exports = EventType