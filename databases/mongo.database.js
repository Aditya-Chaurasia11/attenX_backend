const mongoose = require('mongoose')

const connect = async () => {
	try {
		await mongoose.connect(process.env.MONGO)
		console.log('connected to database 🔗')
	} catch (error) {
		throw new Error(error.message)
	}
}

module.exports = connect