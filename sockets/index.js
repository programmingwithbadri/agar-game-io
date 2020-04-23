const io = require("../server").io;
const Orb = require("./classes/Orb");
const Player = require("./classes/Player");
const PlayerConfig = require("./classes/PlayerConfig");
const PlayerData = require("./classes/PlayerData");
const checkForOrbCollisions = require("./checkCollisions")
  .checkForOrbCollisions;
const checkForPlayerCollisions = require("./checkCollisions")
  .checkForPlayerCollisions;

let orbs = [];
let players = [];

let gameSettings = {
  defaultOrbs: 50,
  defaultSpeed: 6,
  defaultSize: 6,
  defaultZoom: 1.5, // If the player gets bigger, the screen has to zoom out
  worldWidth: 500,
  worldHeight: 500,
};

initGame();

// Send the message to every connected sockets 30 fps(33 ms)
setInterval(() => {
  if (players.length > 0) {
    // Send the players info to everyone in the game room
    io.to("game").emit("tock", {
      players,
    });
  }
}, 33);

io.on("connect", (socket) => {
  let player = {};
  socket.on("init", (data) => {
    // A player has connected
    // Join the Game room
    socket.join("game");
    // Create the player config object
    let playerConfig = new PlayerConfig(gameSettings);

    // Create the player data object
    // Player data will be sent to all other players
    let playerData = new PlayerData(data.playerName, gameSettings);

    // Create Master player object to hold both playerConfig and data
    player = new Player(socket.id, playerConfig, playerData);

    // Send the message to every connected sockets 30 fps(33 ms)
    setInterval(() => {
      // Send the player current loc to the client to focus the player in UI
      socket.emit("tickTock", {
        playerX: player.playerData.locX,
        playerY: player.playerData.locY,
      });
    }, 33);

    socket.emit("defaultOrbs", { orbs });

    // We need to send only the playerData to all the players
    players.push(playerData);
  });

  socket.on("tick", (data) => {
    // update the player config object with the new direction
    // based on the mouse moved
    speed = player.playerConfig.speed;
    player.playerConfig.xVector = data.xVector;
    player.playerConfig.yVector = data.yVector;
    xV = player.playerConfig.xVector;
    yV = player.playerConfig.yVector;

    // Move the player location by the mouse position
    if (
      (player.playerData.locX < 5 && xV < 0) ||
      (player.playerData.locX > gameSettings.worldWidth && xV > 0)
    ) {
      player.playerData.locY -= speed * yV;
    } else if (
      (player.playerData.locY < 5 && yV > 0) ||
      (player.playerData.locY > gameSettings.worldWidth && yV < 0)
    ) {
      player.playerData.locX += speed * xV;
    } else {
      player.playerData.locX += speed * xV;
      player.playerData.locY -= speed * yV;
    }

    // ORB collision
    let capturedOrb = checkForOrbCollisions(
      player.playerData,
      player.playerConfig,
      orbs,
      gameSettings
    );
    capturedOrb
      .then((data) => {
        // Success promise means player captured the orb
        // Emit to all sockets the orb to replace because player captured the orb
        const orbData = {
          orbIndex: data,
          newOrb: orbs[data],
        };

        // Every player should know the leaderBoard info
        io.emit("updateLeaderboard", getLeaderBoard());
        io.emit("orbSwitch", orbData);
      })
      .catch(() => {
        // No orbs captured
      });

    // Player Collision
    let playerDeath = checkForPlayerCollisions(
      player.playerData,
      player.playerConfig,
      players,
      player.playerId
    );
    playerDeath
      .then((data) => {
        // Every player should know the leaderBoard info
        io, emit("updateLeaderboard", getLeaderBoard());
      })
      .catch(() => {});
  });
});

// Get LeaderBoard
function getLeaderBoard() {
  // Sort players based on their score
  players.sort((a, b) => {
    return b.score - a.score;
  });

  let leaderBoard = players.map((currentPlayer) => {
    return {
      name: currentPlayer.name,
      score: currentPlayer.score,
    };
  });

  return leaderBoard;
}

// Runs at the beginning of each game
function initGame() {
  for (let i = 0; i < gameSettings.defaultOrbs; i++) {
    orbs.push(new Orb(gameSettings));
  }
}

module.exports = io;
