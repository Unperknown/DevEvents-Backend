const mongoClient = require('mongodb').MongoClient

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/'

const config = { 
    useUnifiedTopology: true,
    useNewUrlParser: true
}

module.exports = {
    client: null,
    database: null,
    init: async (databaseName, collectionName) => {
        this.client = await mongoClient
            .connect(MONGODB_URI, config)
            .catch(err => console.log(err))

        this.database = this.client.db(databaseName).collection(collectionName)
    },
    close: () => {
        this.client.close()
    }
}