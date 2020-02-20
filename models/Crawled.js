const mongoose = require('mongoose')
const Schema = mongoose.Schema

const _crawled = new Schema({
  title: String,
  date: String,
  location: String,
  price: String,
  imageLink: String,
  hyperLink: String,
  isValid: Boolean
})

const Crawled = mongoose.models.Crawled || mongoose.model('Crawled', _crawled, 'Crawled')

module.exports = {
  Crawled,
}