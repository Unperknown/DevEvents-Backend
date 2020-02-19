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

const _event = mongoose.models.Event || mongoose.model('Event', Event, 'Event')

module.exports = _event