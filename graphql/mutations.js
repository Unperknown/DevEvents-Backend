const { GraphQLObjectType, GraphQLString } = require('graphql');
const eventGraphQLType = require('./eventType');
const event = require('models/event');

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addEvent: {
      type: eventGraphQLType,
      args: {
        title: { type: GraphQLString },
        date: { type: GraphQLString },
        location: { type: GraphQLString },
        price: { type: GraphQLString },
        imageLink: { type: GraphQLString }
      },
      resolve(parent, args) {
        const newEvent = new event({
          title: args.title,
          date: args.date,
          location: args.location,
          price: args.price,
          imageLink: args.imageLink
        })

        return newEvent.save()
      }
    },
    updateEvent: {
      type: eventGraphQLType,
      args: {
        title: { type: GraphQLString },
        date: { type: GraphQLString },
        location: { type: GraphQLString },
        price: { type: GraphQLString },
        imageLink: { type: GraphQLString }
      },
      resolve(parent, args) {
        return event.findById(args.id)
          .then(event => {
            event.title = args.title
            event.date = args.date
            event.location = args.location
            event.price = args.price
            event.imageLink = args.imageLink

            return event.save()

          })
          .then(updatedEvent => updatedEvent)
          .catch(err => console.log(err))
      }
    },
    removeEvent: {
      type: eventGraphQLType,
      args: {
        id: { type: GraphQLString }
      },
      resolve(parent, args) {
        return event.findOneAndDelete(args.id).exec()
          .then(event => event.remove())
          .then(deletedEvent => deletedEvent)
          .catch(err => console.log(err))
      }
    }
  }
})

module.exports = Mutation