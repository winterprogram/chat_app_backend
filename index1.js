const express = require('express')
const event = require('events')
let events = new event.EventEmitter()
const app = express()

events.on('welcome', function (data) {
    console.log('event is working!')
})

app.get('', function (req,res) {
   let  a = {'message' :'hello world'}
    setTimeout (()=>{
        events.emit('welcome', a)
    },2000)
    // event.emit('welcome', a)
    res.send("Hello world")
})

app.listen(3000, 
    console.log(`Example app listening on port 3000`)
    // let db = mongoose.connect(appconfig.db.uri, { useNewUrlParser: true, useUnifiedTopology: true });

)
