const express = require('express')
const { create_class, get_all_class, get_class, update_class } = require('../controllers/class.controller')
const validate = require('../middlewares/validate.middleware')
const { class_create_schema, class_update_schema } = require('../schemas/class.schema')
const verify_token = require('../middlewares/verify_token.middleware')

const route = express.Router()

route.use(verify_token)
route.post('/', validate(class_create_schema), create_class)
route.get('/', get_all_class)
route.get('/:id', get_class)
route.put('/:id', validate(class_update_schema), update_class)

module.exports = route