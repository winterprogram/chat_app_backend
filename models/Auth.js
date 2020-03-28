const mongoose = require('mongoose')
const Schema = mongoose.Schema

let authdata = new Schema({
    userId: {
        type: String
    },
    authtoken: {
        type: String //jwt token generated while login and store
    },
    tokenSecrete: {
        type: String
    },
    tokengenerated: {
        type: Date
    }
});

let auth = mongoose.model('Auth', authdata)

module.exports = auth;