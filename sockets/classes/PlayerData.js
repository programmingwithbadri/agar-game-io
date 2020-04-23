// Use uuid module to create a massive random string to id this player
const { v4: uuidv4 } = require('uuid');

// This data will be shared to all the players
class PlayerData {
  constructor(playerName, gameSettings) {
    this.uid = uuidv4(); // this will generate a crazy string to this player
    this.name = playerName;
    this.locX = Math.floor(gameSettings.worldWidth * Math.random() + 10);
    this.locY = Math.floor(gameSettings.worldHeight * Math.random() + 10);
    this.radius = gameSettings.defaultSize;
    this.color = this.getRandomColor();
    this.score = 0;
    this.orbsAbsorbed = 0;
  }

  getRandomColor() {
    // gets random rgb
    const r = Math.floor(Math.random() * 200 + 50);
    const g = Math.floor(Math.random() * 200 + 50);
    const b = Math.floor(Math.random() * 200 + 50);

    return `rgb(${r}, ${g},${b})`;
  }
}

module.exports = PlayerData;