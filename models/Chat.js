const mongoose = require('mongoose')
const Schema = mongoose.Schema

let chatData = new Schema({
    chatId: {
        type: String
    },
    receiverId: {
        type: String
    },
    receiverName: {
        type: String
    },
    senderId: {
        type: String
    },
    senderName: {
        type: String
    },
    message: {
        type: String
    }
})

let chat = mongoose.model('chat', chatData)

module.exports = {
    chat: chat
}