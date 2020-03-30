const socketio = require('socket.io')
const lib = require('./../libs/tokenLib')
const event = require('events')
// const events = new event.EventEmitter()
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const datachat = require('./../models/Chat')

let chatdata = mongoose.model('chat')
const events = require('events')
const eventchat  = new events.EventEmitter()
let setserver = (server) => {
    let allOnlineuser = []
    let io = socketio.listen(server)
    let myIo = io.of('')

    myIo.on('connection', (socket) => {
        socket.emit('verifyuser', '')
        socket.on('set-user', (authtoken) => {
            lib.verifyToken(authtoken, (err, result) => {
                if (err) {
                    socket.emit({ "errcode": 500, "message": "Please logout user authtoken is not valid" })
                    console.log("logout user")
                } else {
                    console.log("authtoken is verified")
                    let currentuser = result.data.data[0]
                    // console.log(result.data.data[0].userId)
                    socket.userId = currentuser.userId
                    let fullName = `${currentuser.firstName} ${currentuser.lastName}`
                    socket.emit(currentuser.userId, "you are online")
                    let userlist = { userId: currentuser.userId, fullName: currentuser.firstName }
                    allOnlineuser.push(userlist)

                    socket.rooms = 'edchats'
                    socket.join(socket.rooms)
                    socket.to(socket.rooms).broadcast.emit('onlineuser', allOnlineuser)
                }
            })
        });

        socket.on('disconnect', () => {
            console.log(`${socket.userId} is disconnected`)
        });
        
        socket.on('chat-msg', (data) => {
            console.log(data)
            myIo.emit(data.receiverId, data)
            eventchat.emit('store', data)
        })
    })
}
const randomize = require('randomatic');
eventchat.on('store', (data) => {
    let chatId = randomize('aA0', 4)
    let chats = new chatdata({
        chatId: chatId,
        receiverId: data.receiverId,
        senderName: data.senderName,
        senderId: data.senderId,
        message: data.message
    })

    chats.save((err, result) => {
        if (err) {
            console.log(err)
        } else {
            console.log(result)
        }
    })
})

module.exports = {
    setserver: setserver
}
