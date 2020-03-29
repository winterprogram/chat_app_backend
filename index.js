const express = require('express');
const app = express()
const appconfig = require('./config/appconfig')
const bodyParser = require('body-parser')
const cookie = require('cookie-parser')
const mongoose = require('mongoose')
const middleware = require('./middleware/error_handler')
const route_lodger = require('./middleware/route_lodger')


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookie())
app.use(middleware.initalerror)
app.use(route_lodger.routelodger)
var path = require("path");

app.use(express.static(path.join(__dirname ,'client')))

const http = require('http')
// const appconfig = require('./../config/appconfig')

const server = http.createServer(app);
// console.log(appconfig)


server.listen(appconfig.port)
console.log(`app running on port ${appconfig.port}`)
// server.on('error', onError)
server.on('listening', onListening)


const socketLib = require("./libs/socketlib");
const socketServer = socketLib.setserver(server);

function onError(error) {
    if (error.syscall !== 'listen') {
        // logger.error(error.code + ' not equal listen', 'serverOnErrorHandler', 10)
        throw error;
    } switch (error.code) {
        case 'EACCES':
            // logger.error(error.code + ':elavated privileges required', 'serverOnErrorHandler', 10);
            process.exit(1);
            break;
        case 'EADDRINUSE':
            // logger.error(error.code + ':port is already in use.', 'serverOnErrorHandler', 10);
            process.exit(1);
            break;
        default:
            // logger.error(error.code + ':some unknown error occured', 'serverOnErrorHandler', 10);
            throw error;
    }
}

function onListening() {

    // var addr = server.address();
    // var bind = typeof addr === 'string'
    //     ? 'pipe ' + addr
    //     : 'port ' + addr.port;
    // ('Listening on ' + bind);
    // logger.info('server listening on port' + addr.port, 'serverOnListeningHandler', 10);
    let db = mongoose.connect(appconfig.db.uri, { useNewUrlParser: true, useUnifiedTopology: true });
}
process.on('unhandledRejection', (reason, p) => {
    console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
    // application specific logging, throwing an error, or other logic here
});



const fs = require('fs')
let routePath = './routes'
fs.readdirSync(routePath).forEach(function (file) {
    if (~file.indexOf('.js')) {
        let route = require(routePath + '/' + file)
        route.routes(app)
    }
})
app.use(middleware.routeserror)

let modelsPath = './models'
fs.readdirSync(modelsPath).forEach(function (file) {
    if (~file.indexOf('.js')) require(modelsPath + '/' + file)
})





// app.listen(appconfig, async () => {
//     console.log(`Example app listening on port 3000`);
//     let db = mongoose.connect(appconfig.db.uri, { useNewUrlParser: true, useUnifiedTopology: true });

// })

mongoose.connection.on('error', (err, req, res) => {
    console.log(err)
    res.send(err)
    console.log(`some error has occured`)

})

mongoose.connection.on('open', (err, req, res) => {
    if (err) {
        console.log(err)
        res.send(err)
        console.log(`some error has occured`)
    } else {
        console.log(`database is connected successfully`)
    }

})