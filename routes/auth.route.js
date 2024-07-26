const express = require('express')
const { sign_up, sign_in } = require('../controllers/auth.controller')
const validate = require('../middlewares/validate.middleware')
const auth_schema = require('../schemas/auth.schema')

const route = express.Router()

route.post('/signup', validate(auth_schema), sign_up)
route.post('/signin', validate(auth_schema), sign_in)

module.exports = route