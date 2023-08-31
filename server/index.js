const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server,{
  cors: {
    origin: "*"
  }
});

const bodypareser = require('body-parser')
app.use(bodypareser.json)

app.get('/', (req, res) => {
  return res.send('/index.html');
});

io.on('connection', (socket) => {
  console.log(socket);
});


server.listen(3000, () => {
  console.log('listening on *:3000');
});