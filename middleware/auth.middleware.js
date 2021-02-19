const jwt = require('jsonwebtoken')
const jwtConfig = require('../config/jwtConfig.js')

module.exports = (req, res, next) => {
	if (req.method === 'OPTIONS') {
		return next()
	}
	try {
		const token = req.headers.authorization.split(' ')[1] // "Bearer TOKEN"
		if (!token) {

			return res.status(401).json({message: 'Авторизація відсутня'})
		}

		const decoded = jwt.verify(token, jwtConfig.jwtSecret)
		console.log('decoded:', decoded)

		req.user = decoded
		next()

	} catch(e) {
		res.status(401).json({message: 'Авторизація відсутня'})
	}
}