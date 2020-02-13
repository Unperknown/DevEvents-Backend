const { GraphQLSchema, GraphQLObjectType, GraphQLString } = require('graphql')
const eventGraphQLType =  require('./eventType')
const event = require('models/event');
const Mutations = require('./mutations');

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    event: {
      type: eventGraphQLType,
      args: { id: { type: GraphQLString }},
      resolve(parent, args) {
        return event.findById(args.id)
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutations
});