const { Event } = require('models')

const eventsResolvers = {
  Query: {
    events: () => Event.all(),
  },
}

module.exports = {
  eventsResolvers,
}