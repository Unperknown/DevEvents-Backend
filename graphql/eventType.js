const graphql = require('graphql')

const { GraphQLObjectType, GraphQLString, GraphQLBoolean } = graphql

const EventType = new GraphQLObjectType({
  name: 'Event',
  fields: () => ({
    title: { type: GraphQLString },
    date: { type: GraphQLString },
    location: { type: GraphQLString },
    price: { type: GraphQLString },
    imageLink: { type: GraphQLString },
    hyperLink: { type: GraphQLString },
    isValid: { type: GraphQLBoolean }
  })
})

module.exports = EventType