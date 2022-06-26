const dbConnect = (callback) => {
    const { MongoClient } = require('mongodb')

    const dbConnection = 'mongodb://localhost:27017'
    const dbName = 'users'

    MongoClient.connect(dbConnection, {}, (error, client) => {
        if (error) {
            return console.log(error)
        }
        const db = client.db(dbName)
        callback(db)
    })
}

module.exports = dbConnect