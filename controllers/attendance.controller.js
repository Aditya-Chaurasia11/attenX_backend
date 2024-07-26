const mongoose = require('mongoose')
const Attendance = require('../models/attendance.model')
const Student = require('../models/student.model')
const send_telegram_message = require('../utils/send_telegram_message')

const mark_attendance = async (req, res, next) => {
	try {
		let attendance = await Attendance.findOne({ date: req.body.date, class: req.body.class }).populate(['class', 'attendance.student'])
		if (attendance) {
			return res.send({ message: 'attendance already marksheet created', data: attendance })
		}

		const students = await Student.aggregate([
			{ '$match': { class: new mongoose.Types.ObjectId(req.body.class) } },
			{ '$project': { student: '$_id', _id: 0 } }
		])

		attendance = Attendance({ date: req.body.date, class: req.body.class, attendance: students })
		attendance = await attendance.save()
		attendance = await attendance.populate(['class', 'attendance.student'])

		return res.status(201).send({ message: 'attendance marksheet created', data: attendance })
	} catch (error) {
		next(error)
	}
}

const get_attendance = async (req, res, next) => {
	try {
		const attendance = await Attendance.findOne({ date: req.params.date, class: req.params.class }).populate(['class', 'attendance.student'])
		return res.send({ message: 'attendance marksheet fetched', data: attendance })
	} catch (error) {
		next(error)
	}
}

const update_attendance = async (req, res, next) => {
	try {
		const attendance = await Attendance.updateOne({ _id: req.body.id, 'attendance.student': req.body.student }, { $set: { 'attendance.$.mark': req.body.mark } }, { new: true })
		return res.send({ message: 'attendance marked!', data: attendance })
	} catch (error) {
		next(error)
	}
}

const send_bulk_message = async (req, res, next) => {
	try {
		const attendance = await Attendance.findById(req.body.id).populate(['class', 'attendance.student'])
		const date = new Date(attendance.date).toLocaleDateString('en-US', { timeZone: 'Asia/Kolkata' })
		const result = await Promise.allSettled(attendance.attendance.map((row) => {
			// return send_message(row.student.phone_number, row.student.full_name, row.mark, date)
			console.log(row.student.telegram_id, row.student.full_name, row.mark, date);
			return send_telegram_message(row.student.telegram_id, row.student.full_name, row.mark, date)
		}))

		attendance.attendance.forEach((row, i) => {
			row.message_status = (result[i].value == 200) ? 'sent' : 'failed'
		})

		await attendance.save()
		return res.send({ message: 'attendance marked!', data: attendance })
	} catch (error) {
		next(error)
	}
}

module.exports = { mark_attendance, update_attendance, get_attendance, send_bulk_message }