const mongoose = require('mongoose')


const student_attendance_schema = mongoose.Schema({
	student: { type: mongoose.Schema.Types.ObjectId, ref: 'student', required: true },
	mark: { type: String, enum: ['present', 'absent', 'unmarked'], default: 'unmarked' },
	message_status: { type: String, enum: ['sent', 'not sent', 'failed'], default: 'not sent' }
})

const attendance_schema = mongoose.Schema({
	date: { type: Date, default: Date.now() },
	class: { type: mongoose.Schema.Types.ObjectId, ref: 'class', required: true },
	attendance: { type: [student_attendance_schema], required: true }
}, { timestamps: true })

module.exports = mongoose.model('attendance', attendance_schema)