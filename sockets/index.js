const io = require("../server").io;
const Orb = require("./classes/Orb");

let orbs = [];

initGame();

io.sockets.on("connect", (socket) => {
  socket.emit("init", { orbs });
});

// Runs at the beginning of each game
function initGame() {
  for (let i = 0; i < 500; i++) {
    orbs.push(new Orb());
  }
}

module.exports = io;
