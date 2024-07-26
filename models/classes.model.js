const mongoose = require('mongoose')

const class_schema = mongoose.Schema({
	name: { type: String, required: true },
	description: { type: String, default: null },
	url: { type: String, required: true }
})

module.exports = mongoose.model('class', class_schema)