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



app.listen(appconfig.port, async () => {
    console.log(`Example app listening on port 3000`);
    let db = mongoose.connect(appconfig.db.uri, { useNewUrlParser: true, useUnifiedTopology: true });

})

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