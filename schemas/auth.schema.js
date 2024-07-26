const Joi = require('joi')

const auth_schema = Joi.object().keys({
	email: Joi.string().email().required(),
	password: Joi.string().min(8).required()
})

module.exports = auth_schema