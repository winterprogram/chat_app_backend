const express = require('express')
const app = express()
const main = require('./../controllers/app')
const auth = require('./../middleware/auth')
// var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

let routes = (app) => {

    app.post('/signup', main.createuser)
    app.post('/login', main.login)
    app.get('/all', auth.authorized, main.getallusers)
    // app.get('/html', function (req, res) {
    //     res.sendFile(__dirname + '/user1.html');
    // });

}

module.exports = {
    routes: routes
}