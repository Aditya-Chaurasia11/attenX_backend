const Class = require('../models/classes.model')

const create_class = async (req, res, next) => {
	try {
		const class_data = Class({ url: 'https://thumbs.dreamstime.com/b/doodle-school-classroom-supplies-vector-illustration-74892411.jpg', ...req.body })
		await class_data.save()
		return res.status(201).send({ message: 'class created successfully', data: class_data })
	} catch (error) {
		next(error)
	}
}

const get_all_class = async (req, res, next) => {
	try {
		let query = {}
		let filter = {}
		if (req.query.class) {
			query = { name: { $regex: req.query.class, $options: 'i' } }
		}

		if (!req.query.description) {
			filter = { description: 0, url: 0 }
		}

		const classes = await Class.find(query, filter)
		return res.send({ message: 'class fetched successfully!', data: classes })
	} catch (error) {
		next(error)
	}
}

const get_class = async (req, res, next) => {
	try {
		const class_data = await Class.findById(req.params.id)
		return res.send({ message: 'class fetched successfully!', data: class_data })
	} catch (error) {
		next(error)
	}
}

const update_class = async (req, res, next) => {
	try {
		const class_data = await Class.findByIdAndUpdate(req.params.id, req.body, { new: true })
		return res.send({ message: 'class updated successfully!', data: class_data })
	} catch (error) {
		next(error)
	}
}

module.exports = { create_class, get_all_class, get_class, update_class }