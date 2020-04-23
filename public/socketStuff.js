let socket = io.connect("http://localhost:9000");

// This method will be called once the user select start game
function init() {
  // Start drawing the canvas stuff
  draw();

  // Emit the init event from the client to the server
  socket.emit("init", {
    playerName: player.name,
  });
}

// Listens to defaultOrbs event to show the orbs in the UI
socket.on("defaultOrbs", (data) => {
  orbs = data.orbs;
  setInterval(() => {
    socket.emit("tick", {
      xVector: player.xVector,
      yVector: player.yVector,
    });
  }, 33);
});

// Listen to the tock event to show other players in the UI
socket.on("tock", (data) => {
  players = data.players;
});

// Orb to be replaced in the screen
socket.on("orbSwitch", (data) => {
  orbs.splice(data.orbIndex, 1, data.newOrb);
});

// Listen to current player's location to focus
socket.on("tickTock", (data) => {
  player.locX = data.playerX;
  player.locY = data.playerY;
});

// Listen to the leaderBoard event
socket.on("updateLeaderboard", (data) => {
  document.querySelector(".leader-board").innerHTML = "";
  data.forEach((currentPlayer) => {
    document.querySelector(
      ".leader-board"
    ).innerHTML += `<li class="leaderboard-player">${currentPlayer.name} - ${currentPlayer.score}</li>`;
  });
});

// Broadcase the message that the player is killed
socket.on("playerDeath", (data) => {
  document.querySelector(
    "#game-message"
  ).innerHTML = `${data.died.name} absorbed by ${data.killedBy.name}`;
  $("#game-message").css({
    "background-color": "#00e6e6",
    opacity: 1,
  });
  $("#game-message").show();
  $("#game-message").fadeOut(5000);
});
