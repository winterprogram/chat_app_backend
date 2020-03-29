const socketio = require('socket.io')
const lib = require('./../libs/tokenLib')
const event = require('events')
const events = new event.EventEmitter()


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
                    let currentuser = result.data;
                    socket.userId = currentuser.userId
                    let fullName = `${currentuser.userDeatils.firstName} ${currentuser.userDeatils.lastName}`
                    socket.emit(currentuser.userId, "you are online")
                }
            })
        })
    })
}
