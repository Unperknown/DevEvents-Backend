const Event = require('models/Event/mongodb')

const events = Event.loadEventsData()

module.exports = {
  events,
};