const jwt = require('jsonwebtoken')

module.exports = (token, type) => {
	const secret = (type === 'refresh') ? process.env.REFRESH_SECERET : process.env.ACCESS_SECRET
	try {
		const decoded = jwt.verify(token, secret)
		return { valid: true, decoded: decoded, exprired: false }
	} catch (error) {
		return { valid: false, decoded: null, exprired: true }
	}
}