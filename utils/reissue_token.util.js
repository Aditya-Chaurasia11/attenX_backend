const jwt = require('jsonwebtoken')
const verify_token = require('./verify_jwt.util')

module.exports = (refresh_token) => {
	const { decoded, exprired } = verify_token(refresh_token, 'refresh')
	if (exprired) { return null }

	const access_token = jwt.sign(decoded, process.env.ACCESS_SECRET, { expiresIn: '24h' })
	return access_token
}