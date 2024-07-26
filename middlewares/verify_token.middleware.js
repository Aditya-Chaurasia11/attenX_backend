const verify_jwt = require('../utils/verify_jwt.util')
const reissue_token = require('../utils/reissue_token.util')

module.exports = async (req, res, next) => {
	if (!req.headers.authorization || !req.headers['x-refresh-token']) {
		return res.status(400).send({ messsage: 'please login!' })
	}

	const access_token = req.headers.authorization.replace(/^Bearer\s/, '')
	const refresh_token = req.headers['x-refresh-token']

	const { decoded, exprired } = verify_jwt(access_token, 'access')

	if (exprired) {
		const new_access_token = reissue_token(refresh_token)
		if (!new_access_token) { return res.status(400).send({ message: 'invalid refresh token!' }) }

		res.setHeader('x-access-token', new_access_token)
		const { decoded } = verify_jwt(new_access_token, 'access')
		req.user = decoded
		return next()
	}

	req.user = decoded
	return next()
}