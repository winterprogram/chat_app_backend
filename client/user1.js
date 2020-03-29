// connecting with sockets.
const socket = io('http://localhost:3000');
// const express = require('express')
const authtoken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RpZCI6ImNnUEEiLCJpYXQiOjE1ODU1MDMyNTc2NzIsImV4cCI6MTU4NTU4OTY1Nywic3ViIjoiYXV0aFRva2VuIiwiaXNzIjoiZWRDaGF0IiwiZGF0YSI6eyJlcnIiOmZhbHNlLCJtZXNzYWdlIjoiZW1haWwgaXMgdmFsaWQiLCJzdGF0dXMiOjIwMCwiZGF0YSI6W3sidXNlcklkIjoiSGlTaiIsImZpcnN0TmFtZSI6InNhbmRlZXAiLCJsYXN0TmFtZSI6ImMiLCJlbWFpbCI6InNhbmRlZXBAZ2FtaWwuY29tIiwibW9iaWxlTnVtYmVyIjo5MTY3MTYyMDE5LCJfaWQiOiI1ZTgwZGMxOTZjNWMyNTMxZTRkOWUxNmUifV19fQ.FaevZwfv3hvqg7F7U9HnqdSAdIoToUk8J5G2cusBY8E"
const userId= "HiSj"

let chatSocket = () => {

  socket.on('verifyuser', (data) => {

    console.log("socket trying to verify user");

    socket.emit("set-user", authtoken);

  });

  socket.on(userId, (data) => {

    console.log("you received a message")
    console.log(data)

  });




}// end chat socket function

chatSocket();
