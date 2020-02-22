const { crawledsResolvers } = require('./crawledsResolvers')
const { eventsResolvers } = require('./eventsResolvers')
const { requestorsResolvers } = require('./requestorsResolvers')

const resolvers = [ crawledsResolvers, eventsResolvers, requestorsResolvers ]

module.exports = {
  resolvers,
}