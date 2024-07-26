const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')

dotenv.config()

const connect = require('./databases/mongo.database')
const error_handler = require('./middlewares/error_handler.middleware')
const auth_route = require('./routes/auth.route')
const class_route = require('./routes/class.route')
const student_route = require('./routes/student.route')
const attendance_route = require('./routes/attendance.route')

const PORT = process.env.PORT || 3000
const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => res.send({ message: 'hello! I am alive' }))
app.use('/auth', auth_route)
app.use('/class', class_route)
app.use('/student', student_route)
app.use('/attendance', attendance_route)

app.use((req, res) => res.status(404).send({ message: 'requested endpoint not found' }))
app.use(error_handler)

app.listen(PORT, async () => {
	console.log('server started 🚀')
	await connect()
})
