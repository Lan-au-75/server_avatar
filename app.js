require('dotenv').config()
const createError = require('http-errors')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const cors = require('cors')
const express = require('express')
const path = require('path')

// router
const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')
const apiRouter = require('./routes/api')

// config db
const db = require('./config/db')

// create app
const app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

// router
app.use('/', cors(), indexRouter)
app.use('/users', usersRouter)
app.use('/api/v1', apiRouter)
app.use('*', (req, res, next) => {
    res.status(404).send('Nhập Sai Đường Dẫn! Vui Lòng Nhập Lại >.<')
})

// connect db

db.connect()

// catch 404 and forward to error handler

app.use(function (req, res, next) {
    next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}

    // render the error page
    res.status(err.status || 500)
    res.render('error')
})

module.exports = app
