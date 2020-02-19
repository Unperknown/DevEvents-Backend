const { events } = require('data')

class Events {
  static all() {
    return events
  }
}

module.exports = {
  Events,
}