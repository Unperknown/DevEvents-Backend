const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Event = new Schema({
  title: String,
  date: String,
  location: String,
  price: Number
})

const _event = mongoose.models.Event || mongoose.model('Event', Event, 'Event')

module.exports = _event