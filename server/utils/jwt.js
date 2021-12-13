const jwt = require('jsonwebtoken');
const { getJwtSecret } = require('../utils/configs');

const getAuthToken = (id) => {
    return jwt.sign({ id }, getJwtSecret(), { expiresIn: 84000})
}

module.exports = {
    getAuthToken
}