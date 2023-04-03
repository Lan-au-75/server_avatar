var express = require('express')
var router = express.Router()

var UsersController = require('../controller/UsersController')

/* GET users listing. */

router.post('/profile', UsersController.handleUpload)
router.get('/profile', UsersController.getUpload)
router.post('/photos/upload', UsersController.handleMultipleUpload)
router.get('/photos', UsersController.getMultipleUpload)

module.exports = router
