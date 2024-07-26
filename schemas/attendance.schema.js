const Joi = require('joi')

const mark_attendance_schema = Joi.object().keys({
	date: Joi.date().required(),
	class: Joi.string().hex().length(24).required()
})

const update_attendance_schema = Joi.object().keys({
	id: Joi.string().hex().length(24).required(),
	student: Joi.string().hex().length(24).required(),
	mark: Joi.string().valid('present', 'absent', 'unmarked').required(),
})

const message_schema = Joi.object().keys({
	id: Joi.string().hex().length(24).required()
})


module.exports = { mark_attendance_schema, update_attendance_schema, message_schema }