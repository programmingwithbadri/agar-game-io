class Orb {
  constructor(gameSettings) {
    this.color = this.getRandomColor();
    this.locX = Math.floor(gameSettings.worldWidth * Math.random());
    this.locY = Math.floor(gameSettings.worldHeight * Math.random());
    this.radius = 5;
  }

  getRandomColor() {
    // gets random rgb
    const r = Math.floor(Math.random() * 200 + 50);
    const g = Math.floor(Math.random() * 200 + 50);
    const b = Math.floor(Math.random() * 200 + 50);

    return `rgb(${r}, ${g},${b})`;
  }
}

module.exports = Orb;
