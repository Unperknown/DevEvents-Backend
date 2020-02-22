const mongoose = require('mongoose')
const Schema = mongoose.Schema

const _requestor = new Schema({
  name: String
})

const Requestor = mongoose.models.Requestor || mongoose.model('Requestor', _requestor, 'Requestor')

module.exports = {
  Requestor,
}