const { AuthenticationError, ApolloError } = require('apollo-server-koa')

const { Crawled, Requestor } = require('models')
const { FestaCrawler } = require('controllers')

const crawledsResolvers = {
  Query: {
    crawled: async (_, { id }) => await Crawled.findById(id),
    crawleds: async () => await Crawled.find({}),
  },
  Mutation: {
    fetchCrawledData: async (parent, args, { authenticated }) => {
      if (!authenticated) {
        throw new AuthenticationError('This mutation should be proceeded after authentication')
      }
      
      let crawled = await FestaCrawler.fetch()

      let state = await Crawled.deleteMany({})

      if (!isDropped(state)) {
        throw new ApolloError('Outdated crawled data was not completely removed!', 'MONGODB_ERROR')
      }

      let fetched = await Crawled.insertMany(crawled)

      return fetched
    },
    addCrawledData: async (_, { crawled, requestor }) => {
      const newData = new Crawled(crawled)

      await newData.save()
  
      if (requestor) {
        let _requestor = { name: requestor }
  
        const newRequestor = new Requestor(_requestor)
        
        await newRequestor.save()
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
