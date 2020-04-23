// Data where other players dont need to know
class PlayerConfig {
    constructor(gameSettings) {
        // Players default location will be 0
        this.xVector = 0;
        this.yVector = 0;

        this.speed = gameSettings.defaultSpeed;
        this.zoom = gameSettings.defaultZoom
    }
}

module.exports = PlayerConfig;