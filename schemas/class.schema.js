const Joi = require('joi')

const class_create_schema = Joi.object().keys({
	name: Joi.string().required(),
	description: Joi.string()
})

const class_update_schema = Joi.object().keys({
	name: Joi.string(),
	description: Joi.string()
})

module.exports = { class_create_schema, class_update_schema }