const mongoose = require('mongoose')
function connect() {
    mongoose.connect(process.env.MONGODB_URL).then(() => console.log('Connect to MongoDB'))
}

module.exports = { connect }
