module.exports = (schema) => {
	return (req, res, next) => {
		const { value, error } = schema.validate(req.body)
		if (!error) {
			req.body = value
			return next()
		}

		return res.status(400).send({ message: 'invalid request payload!', data: error.details })
	}
}