const express = require("express");
const socketIo = require("socket.io");
const helmet = require("helmet");

const app = express();
app.use(helmet())

app.use(express.static(__dirname + "/public"));
const expressServer = app.listen("9000");

const io = socketIo(expressServer);

module.exports = {
    app,
    io
}
