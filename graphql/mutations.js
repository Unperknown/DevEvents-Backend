const { GraphQLObjectType, GraphQLString, GraphQLBoolean } = require('graphql');
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
        imageLink: { type: GraphQLString },
        hyperLink: { type: GraphQLString },
        isValid: { type: GraphQLBoolean }
      },
      resolve(parent, args) {
        const newEvent = new event({
          title: args.title,
          date: args.date,
          location: args.location,
          price: args.price,
          imageLink: args.imageLink,
          hyperLink: args.hyperLink,
          isValid: args.isValid
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
        imageLink: { type: GraphQLString },
        hyperLink: { type: GraphQLString },
        isValid: { type: GraphQLBoolean }
      },
      resolve(parent, args) {
        return event.findById(args.id)
          .then(event => {
            event.title = args.title
            event.date = args.date
            event.location = args.location
            event.price = args.price
            event.imageLink = args.imageLink
            event.hyperLink = args.hyperLink
            event.isValid = args.isValid

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
      async resolve(parent, args) {
        let result = await event.findOneAndDelete({ _id: args.id })
        
        return result
      }
    }
  }
})

module.exports = Mutation