const express = require("express");
const socketIo = require("socket.io");

const app = express();

app.use(express.static(__dirname + "/public"));
const expressServer = app.listen("9000");

const io = socketIo(expressServer);
