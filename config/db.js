const mongoose = require('mongoose')
function connect() {
    mongoose.connect(process.env.DB_CONNECT).then(() => console.log('Connect to MongoDB'))
}

module.exports = { connect }
