const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Event = new Schema({
  title: String,
  date: String,
  location: String,
  price: String,
  imageLink: String,
  hyperLink: String,
  isValid: Boolean
})

Event.statics.fetchEventsData = async function (events) {
  let result = await this.insertMany(events)

  return result
}

Event.statics.loadEventsData = async function () {
  let result = await this.find({})

  return result
}

const _event = mongoose.models.Event || mongoose.model('Event', Event, 'Event')

module.exports = _event