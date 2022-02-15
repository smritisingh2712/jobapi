const jwt = require('jsonwebtoken')
const { UnauthenticatedError } = require('../errors/index')
const User = require('../models/User')
const auth = async (req, res, next) => {

    const headers = req.headers.authorization

    if (!headers || !headers.startsWith('Bearer')) {

        throw new UnauthenticatedError('Authentication Invalid')
    }
    const token = headers.split(' ')[1]

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        req.user = { userId: payload.userId, name: payload.name }
        next()
    } catch (err) {
        throw new UnauthenticatedError('Authentication Invalid')
    }


}
module.exports = auth

