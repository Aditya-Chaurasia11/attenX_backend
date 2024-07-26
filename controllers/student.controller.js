const Student = require('../models/student.model')

const create_student = async (req, res, next) => {
	try {
		const student = Student(req.body)
		await student.save()
		res.status(201).send({ message: 'user created successfully!', data: student })
	} catch (error) {
		next(error)
	}
}

const get_all_student = async (req, res, next) => {
	try {
		let query = {}
		if (req.query.class) { query.class = req.query.class }

		if (req.query.student) { query.full_name = { $regex: req.query.student, $options: 'i' } }

		const students = await Student.find(query).populate('class', { description: 0, url: 0 })
		res.send({ message: 'student fetched successfully!', data: students })
	} catch (error) {
		next(error)
	}
}

const get_student = async (req, res, next) => {
	try {
		const student = await Student.findById(req.params.id).populate('class', { description: 0, url: 0 })
		res.send({ message: 'student fetched successfully!', data: student })
	} catch (error) {
		next(error)
	}
}

const update_student = async (req, res, next) => {
	try {
		const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true })
		res.send({ message: 'student updated successfully!', data: student })
	} catch (error) {
		next(error)
	}
}

module.exports = { create_student, get_all_student, get_student, update_student }