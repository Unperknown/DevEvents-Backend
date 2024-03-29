const mongoose = require('mongoose')
const Schema = mongoose.Schema

const _event = new Schema({
  title: String,
  date: Date,
  location: String,
  price: Number,
  imageLink: String,
  hyperLink: String,
  isValid: Boolean
})

const Event = mongoose.models.Event || mongoose.model('Event', _event, 'Event')

module.exports = {
  Event,
}