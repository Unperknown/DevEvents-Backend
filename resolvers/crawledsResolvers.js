const _ = require('lodash')

const { ApolloError, UserInputError } = require('apollo-server-koa')

const { Crawled } = require('models')
const { Crawler } = require('controllers/crawler')

const crawledsResolvers = {
  Query: {
    crawled: async (_, { id }) => await Crawled.findById(id),
    crawleds: async () => await Crawled.find({}),
  },
  Mutation: {
    fetchCrawledData: async () => {
      let crawled = await Crawler.fetchCrawledData()

      let state = await Crawled.deleteMany({})

      if (!isDropped(state)) {
        throw new ApolloError('Outdated crawled data was not completely removed!', 'MONGODB_ERROR')
      }

      let fetched = await Crawled.insertMany(crawled)

      return fetched
    }
  }
}

module.exports = {
  crawledsResolvers,
}

function isDropped(state) {
  return state.ok === 1 && state.deletedCount === state.n
}