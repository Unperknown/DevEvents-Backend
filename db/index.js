const mongoClient = require('mongodb').MongoClient

const config = { 
    useUnifiedTopology: true,
    useNewUrlParser: true 
}

module.exports = {
    client: null,
    database: null,
    init: async () => {
        this.client = await mongoClient
            .connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/', config)
            .catch(err => console.log(err))
    },
    set: (databaseName, collectionName) => {
        this.database = this.client.db(databaseName).collection(collectionName)
    },
    close: () => {
        this.client.close()
    }
}