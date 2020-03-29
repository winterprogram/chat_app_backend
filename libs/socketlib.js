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
                    let currentuser = result.data.data[0]
                    // console.log(result.data.data[0].userId)
                    socket.userId = currentuser.userId
                    let fullName = `${currentuser.firstName} ${currentuser.lastName}`
                    socket.emit(currentuser.userId, "you are online")
                    let userlist = { userId: currentuser.userId, fullName: currentuser.firstName }
                    allOnlineuser.push(userlist)
                }
            })
        })

        socket.on('disconnect', () => {
            console.log(`${socket.userId} is disconnected`)
        })
    })
}

module.exports={
    setserver:setserver
}
