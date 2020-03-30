// connecting with sockets.
const socket = io('http://localhost:3000');
// const express = require('express')
const authtoken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RpZCI6InhYV0oiLCJpYXQiOjE1ODU1OTI5ODM2ODAsImV4cCI6MTU4NTY3OTM4Mywic3ViIjoiYXV0aFRva2VuIiwiaXNzIjoiZWRDaGF0IiwiZGF0YSI6eyJlcnIiOmZhbHNlLCJtZXNzYWdlIjoiZW1haWwgaXMgdmFsaWQiLCJzdGF0dXMiOjIwMCwiZGF0YSI6W3sidXNlcklkIjoiSGlTaiIsImZpcnN0TmFtZSI6InNhbmRlZXAiLCJsYXN0TmFtZSI6ImMiLCJlbWFpbCI6InNhbmRlZXBAZ2FtaWwuY29tIiwibW9iaWxlTnVtYmVyIjo5MTY3MTYyMDE5LCJfaWQiOiI1ZTgyM2E5N2Q0Y2E0ZTQ4OTQ0NzQ5MWQifV19fQ.yreMYzdfeKn_Ais1T6IS3bqiImH8Kgvaut0utaFMryw"
const userId = "HiSj"

let chatMessage = {
  createdOn: Date.now(),
  receiverId: 'WQo1',//putting user2's id here 
  receiverName: "Aditya Kumar",
  senderId: userId,
  senderName: "Mr Xyz"
}
let chatSocket = () => {

  socket.on('verifyuser', (data) => {

    console.log("socket trying to verify user");

    socket.emit("set-user", authtoken);
    // eventchat.emit('store', )
  });

  socket.on(userId, (data) => {

    console.log("you received a message")
    // console.log(data)
    console.log("you received a message from " + data.senderName)
    console.log(data.message)
  });
  $("#send").on('click', function () {

    let messageText = $("#messageToSend").val()
    chatMessage.message = messageText;
    socket.emit("chat-msg", chatMessage)

  })




}// end chat socket function

chatSocket();
