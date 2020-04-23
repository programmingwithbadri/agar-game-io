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
    })
  }, 33);
});

// Listen to the tock event to show other players in the UI
socket.on("tock", (data) => {
  players = data.players;
  player.locX = data.playerX;
  player.locY = data.playerY;
});

// Orb to be replaced in the screen 
socket.on("orbSwitch", (data) => {
  orbs.splice(data.orbIndex, 1, data.newOrb)
})
