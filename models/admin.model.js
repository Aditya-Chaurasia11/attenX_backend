const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const admin_schema = mongoose.Schema({
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true }
})

admin_schema.pre('save', async function (next) {
	try {
		if (!this.isModified('password')) { return next() }

		const salt = await bcrypt.genSalt(10)
		const hash = await bcrypt.hash(this.password, salt)

		this.password = hash
		return next()
	} catch (error) {
		return next(error)
	}
})

admin_schema.methods.compare_password = function (password) {
	return bcrypt.compare(password, this.password)
}

module.exports = mongoose.model('admin', admin_schema)