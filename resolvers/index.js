const { crawledsResolvers } = require('./crawledsResolvers')
const { eventsResolvers } = require('./eventsResolvers')

const resolvers = [ crawledsResolvers, eventsResolvers ]

module.exports = {
  resolvers,
}