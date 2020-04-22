const io = require("../server").io;
const Orb = require("./classes/Orb");
const Player = require("./classes/Player");
const PlayerConfig = require("./classes/PlayerConfig");
const PlayerData = require("./classes/PlayerData");

let orbs = [];

let gameSettings = {
  defaultOrbs: 500,
  defaultSpeed: 6,
  defaultSize: 6,
  defaultZoom: 1.5,  // If the player gets bigger, the screen has to zoom out
  worldWidth: 500,
  worldHeight: 500
}

initGame();

io.on("connect", (socket) => {
  // A player has connected
  // Create the player config object
  let playerConfig = new PlayerConfig(gameSettings);

  // Create the player data object
  // Player data will be sent to all other players
  let playerData = new PlayerData(null, gameSettings);

  // Create Master player object to hold both
  let player = new Player(socket.id, playerConfig, playerData)
  socket.emit("init", { orbs });
});

// Runs at the beginning of each game
function initGame() {
  for (let i = 0; i < gameSettings.defaultOrbs; i++) {
    orbs.push(new Orb(gameSettings));
  }
}

module.exports = io;
