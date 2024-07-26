const jwt = require('jsonwebtoken')
const Admin = require('../models/admin.model')

const sign_up = async (req, res, next) => {
	try {
		const admin = Admin(req.body)
		await admin.save()
		const { password, ...data } = admin.toObject()
		console.log(data);
		return res.status(201).send({ message: 'admin signed up successfully', data: data })
	} catch (error) {
		next(error)
	}
}

const sign_in = async (req, res, next) => {
	try {
		const admin = await Admin.findOne({ email: req.body.email })
		if (!admin) { return res.status(404).send({ message: 'wrong username or password!' }) }

		const is_valid = await admin.compare_password(req.body.password)
		if (!is_valid) { return res.status(400).send({ message: 'wrong username or password!' }) }

		const refresh_token = jwt.sign({ id: admin._id }, process.env.REFRESH_SECERET)
		const access_token = jwt.sign({ id: admin._id }, process.env.ACCESS_SECRET, { expiresIn: '24h' })
		return res.send({ message: 'user signed in successfully!', data: { access_token, refresh_token } })

	} catch (error) {
		next(error)
	}
}

module.exports = { sign_up, sign_in }