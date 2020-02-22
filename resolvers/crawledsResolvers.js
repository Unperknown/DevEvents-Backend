const { ApolloError, UserInputError } = require('apollo-server-koa')

const { Crawled, Requestor } = require('models')
const { FestaCrawler } = require('controllers')

const crawledsResolvers = {
  Query: {
    crawled: async (_, { id }) => await Crawled.findById(id),
    crawleds: async () => await Crawled.find({}),
  },
  Mutation: {
    fetchCrawledData: async () => {
      let crawled = await FestaCrawler.fetch()

      let state = await Crawled.deleteMany({})

      if (!isDropped(state)) {
        throw new ApolloError('Outdated crawled data was not completely removed!', 'MONGODB_ERROR')
      }

      let fetched = await Crawled.insertMany(crawled)

      return fetched
    },
    addCrawledData: async (_, { crawled, requestor }) => {
      let state = await Crawled.insertOne(crawled)
  
      if (!isInserted(state)) {
        throw new UserInputError('Requested crawled data is inappropriate to fetch to database!')
      }
  
      if (requestor) {
        let _requestor = { name: requestor }
  
        state = await Requestor.insertOne(_requestor)
        
        if (!isInserted(state)) {
          throw new UserInputError('Requestor\'s information was not compeletely fetched to database!')
        }
      }
  
      return crawled
    },
  },
}

module.exports = {
  crawledsResolvers,
}

function isInserted(state) {
  return state.acknowledged
}

function isDropped(state) {
  return state.ok === 1 && state.deletedCount === state.n
}
