const express = require('express')
const { mark_attendance, update_attendance, get_attendance, send_bulk_message } = require('../controllers/attendance.controller')
const validate = require('../middlewares/validate.middleware')
const { mark_attendance_schema, update_attendance_schema, message_schema } = require('../schemas/attendance.schema')
const verify_token = require('../middlewares/verify_token.middleware')

const route = express.Router()

route.use(verify_token)
route.post('/', validate(mark_attendance_schema), mark_attendance)
route.put('/', validate(update_attendance_schema), update_attendance)
route.get('/:class/:date', get_attendance)
route.post('/message', validate(message_schema), send_bulk_message)

module.exports = route