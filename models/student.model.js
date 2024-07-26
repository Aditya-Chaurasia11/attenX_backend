const mongoose = require('mongoose')

const student_schema = mongoose.Schema({
	full_name: { type: String, required: true },
	class: { type: mongoose.Schema.Types.ObjectId, ref: 'class', required: true },
	phone_number: { type: String, required: true },
	telegram_id: { type: String, required: true }
})

module.exports = mongoose.model('student', student_schema)