const express = require('express')
const app = express()
const main = require('./../controllers/app')
const auth = require('./../middleware/auth')


let routes = (app) => {

    app.post('/signup', main.createuser)
    app.post('/login', main.login)
    app.get('/all', auth.authorized, main.getallusers)

}

module.exports = {
    routes: routes
}