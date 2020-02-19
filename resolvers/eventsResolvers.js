const { UserInputError } = require('apollo-server-koa')
const { Event } = require('models')

const eventsResolvers = {
  Query: {
    event: async (_, { id }) => await Event.findById(id),
    events: async () => await Event.find({}),
  },
  Mutation: {
    addEvent: async (_, { event }) => {
      const newEvent = new Event(event)

      await newEvent.save()

      return event
    },
    updateEvent: async (_, { id, event }) => {
      let state = await Event.updateOne({ _id: id }, { $set: event })

      if (state.n !== 1 || state.nModified !== 1 || state.ok !== 1) {
        throw new UserInputError('Requested Data was not completely updated!')
      }

      let updated = await Event.findOne({ _id: id })
      
      return updated
    },
    removeEvent: async (_, { id }) => {
      let result = await Event.findOneAndDelete({ _id: id })

      return result
    }
  }
}

module.exports = {
  eventsResolvers,
}