var express = require('express')
var router = express.Router()

var { HomeController } = require('../controller/HomeController')

/* GET home page. */
router.get('/', (req, res) => {
    res.send('SERVER ON')
})

module.exports = router
