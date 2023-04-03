var express = require('express')
var router = express.Router()

var APIController = require('../controller/APIController')

router.get('/users', APIController.getAllUser)
router.post('/users', APIController.createUser)
router.get('/search/users', APIController.searchUser)
router.get('/users/:userId', APIController.detailUser)
router.put('/users/:userId', APIController.updateUser)
router.patch('/users/:userId', APIController.updateUser)
router.delete('/users/:userId', APIController.deleteUser)

module.exports = router
