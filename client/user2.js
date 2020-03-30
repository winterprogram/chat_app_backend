// connecting with sockets.
const socket = io('http://localhost:3000');
// const express = require('express')
const authtoken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RpZCI6IkVOT1giLCJpYXQiOjE1ODU1OTI5MjQ1ODUsImV4cCI6MTU4NTY3OTMyNCwic3ViIjoiYXV0aFRva2VuIiwiaXNzIjoiZWRDaGF0IiwiZGF0YSI6eyJlcnIiOmZhbHNlLCJtZXNzYWdlIjoiZW1haWwgaXMgdmFsaWQiLCJzdGF0dXMiOjIwMCwiZGF0YSI6W3sidXNlcklkIjoiV1FvMSIsImZpcnN0TmFtZSI6InNhbmRlZXAiLCJsYXN0TmFtZSI6ImMiLCJlbWFpbCI6InNhbmRlZXAuY2hha2xhZGFyQGdhbWlsLmNvbSIsIm1vYmlsZU51bWJlciI6OTE2NzE2MjAxOSwiX2lkIjoiNWU4MjNhNWM5M2E0NzQyNWM0YmY2NTJjIn1dfX0.wZzguGazfEuPY9uAdEZty7uux8l-_xRuOPtAluYJpFc"
const userId = "WQo1"

let chatMessage = {
    createdOn: Date.now(),
    receiverId: 'HiSj',//putting user2's id here 
    receiverName: "Sandeep",
    senderId: userId,
    senderName: "Mr X"
}
let chatSocket = () => {

    socket.on('verifyuser', (data) => {

        console.log("socket trying to verify user");

        socket.emit("set-user", authtoken);

    });

    socket.on(userId, (data) => {
        console.log(data,userId)
        console.log("you received a message from " + data.senderName)
        console.log(data.message)

    });

    socket.on('onlineuser', (data) => {
        console.log(`update online user list`)
        console.log(data)
    })
    $("#send").on('click', function () {

        let messageText = $("#messageToSend").val()
        chatMessage.message = messageText;
        socket.emit("chat-msg", chatMessage)

    })




}// end chat socket function

chatSocket();
