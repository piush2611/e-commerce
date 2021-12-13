require('dotenv').config()

const getPort = () => process.env.PORT || '';
const getJwtSecret = () => process.env.TOKEN_SECRET || '';
const getMongoUri = () => process.env.MONGO_URI || '';

module.exports = {
    getPort,
    getJwtSecret,
    getMongoUri
}