const { AuthenticationError, UserInputError } = require('apollo-server-koa')
const { Event } = require('models')

const eventsResolvers = {
  Query: {
    event: async (_, { id }, { authenticated }) => {
      if (!authenticated) {
        throw new AuthenticationError('This query should be proceeded after authentication')
      }

      let event = await Event.findById(id)

      return event
    },
    events: async () => await Event.find({}),
  },
  Mutation: {
    addEvent: async (_, { event }, { authenticated }) => {
      if (!authenticated) {
        throw new AuthenticationError('This mutation should be proceeded after authentication')
      }

      const newEvent = new Event(event)

      await newEvent.save()

      return event
    },
    updateEvent: async (_, { id, event }, { authenticated }) => {
      if (!authenticated) {
        throw new AuthenticationError('This mutation should be proceeded after authentication')
      }

      let state = await Event.updateOne({ _id: id }, { $set: event })

      if (!isUpdated(state)) {
        throw new UserInputError('Requested data was not completely updated!')
      }

      let updated = await Event.findOne({ _id: id })
      
      return updated
    },
    removeEvent: async (_, { id }, { authenticated }) => {
      if (!authenticated) {
        throw new AuthenticationError('This mutation should be proceeded after authentication')
      }
      
      let result = await Event.findOneAndDelete({ _id: id })

      if (!isRemoved(result)) {
        throw new UserInputError('Requested data was not completely removed!')
      }

      return result
    }
  }
}

module.exports = {
  eventsResolvers,
}

function isUpdated(state) {
  return state.n === 1 && state.nModified === 1 && state.ok === 1
}

function isRemoved(result) {
  return !_.isEmpty(result)
}