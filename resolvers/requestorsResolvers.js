const { Requestor } = require('models')

const requestorsResolvers = {
  Query: {
    requestors: async (parent, args, { authenticated }) => {
      if (!authenticated) {
        throw new AuthenticationError('This query should be proceeded after authentication')
      }

      let requestors = await Requestor.find({})

      return requestors
    },
  },
}

module.exports = {
  requestorsResolvers,
}