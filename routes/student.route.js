const express = require('express')
const { create_student, get_all_student, get_student, update_student } = require('../controllers/student.controller')
const validate = require('../middlewares/validate.middleware')
const { student_create_schema, student_update_schema } = require('../schemas/student.schema')
const verify_token = require('../middlewares/verify_token.middleware')

const route = express.Router()

route.use(verify_token)
route.post('/', validate(student_create_schema), create_student)
route.get('/', get_all_student)
route.get('/:id', get_student)
route.put('/:id', validate(student_update_schema), update_student)

module.exports = route