// connecting with sockets.
const socket = io('http://localhost:3000');
// const express = require('express')
const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RpZCI6InIxSGtjWEs5TSIsImlhdCI6MTUyMjI0ODE1Njc4MywiZXhwIjoxNTIyMzM0NTU2LCJzdWIiOiJhdXRoVG9rZW4iLCJpc3MiOiJlZENoYXQiLCJkYXRhIjp7Im1vYmlsZU51bWJlciI6OTg3NDU4OTk2NiwiZW1haWwiOiJ4eXpAZ21haWwuY29tIiwibGFzdE5hbWUiOiJYeXoiLCJmaXJzdE5hbWUiOiJNciIsInVzZXJJZCI6IkgxcE9RR1k5TSJ9fQ.GJPmnMkOam1MHak9UA1iXF88VoIYjuKFhHud4qJdZDQ"
const userId= "H1pOQGY9M"

let chatSocket = () => {

  socket.on('verifyUser', (data) => {

    console.log("socket trying to verify user");

    socket.emit("set-user", authToken);

  });

  socket.on(userId, (data) => {

    console.log("you received a message")
    console.log(data)

  });




}// end chat socket function

chatSocket();
