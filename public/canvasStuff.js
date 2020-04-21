function init() {
  draw();
}

// Canvas Drawing
player.locX = Math.floor(500 * Math.random() + 10);
player.locY = Math.floor(500 * Math.random() + 10);

// Context was set as 2D in the uiStuff.js
function draw() {
  // Reset the canvas translate
  context.setTransform(1, 0, 0, 1, 0, 0);

  // Clear the canvas whenever the draw method is called
  // So that we wont see the player circle is dragging across the window
  // when the mouse is moved
  context.clearRect(0, 0, canvas.width, canvas.height);

  // Move the canvas but set the focus to the player position
  const camX = -player.locX + canvas.width / 2;
  const camY = -player.locY + canvas.height / 2;

  // Translate around us to move the canvas around
  context.translate(camX, camY);

  context.beginPath();
  context.fillStyle = "rgb(255,0,0)";

  context.fill();

  // Will add border around the circle
  context.lineWidth = 3;
  context.strokeStyle = "rgb(0,255,0)";
  context.stroke();

  // Load the orbs got from socket server
  orbs.forEach((orb) => {
    context.beginPath();
    context.fillStyle = orb.color;
    context.arc(orb.locX, orb.locY, orb.radius, 0, Math.PI * 2);
    context.fill();
  });

  // Recursively calls the draw method to update the canvas
  // based on x and y axis that will be provided by mouse move in the UI
  requestAnimationFrame(draw);
}

canvas.addEventListener("mousemove", (event) => {
  // Get the mouse position in UI
  const mousePosition = {
    x: event.clientX,
    y: event.clientY,
  };

  // Returns the angle between the mouse position
  const angleDeg =
    (Math.atan2(
      mousePosition.y - canvas.height / 2,
      mousePosition.x - canvas.width / 2
    ) *
      180) /
    Math.PI;

  // Get the quadrant of the mouse (1,2,3,4)
  if (angleDeg >= 0 && angleDeg < 90) {
    xVector = 1 - angleDeg / 90;
    yVector = -(angleDeg / 90);
  } else if (angleDeg >= 90 && angleDeg <= 180) {
    xVector = -(angleDeg - 90) / 90;
    yVector = -(1 - (angleDeg - 90) / 90);
  } else if (angleDeg >= -180 && angleDeg < -90) {
    xVector = (angleDeg + 90) / 90;
    yVector = 1 + (angleDeg + 90) / 90;
  } else if (angleDeg < 0 && angleDeg >= -90) {
    xVector = (angleDeg + 90) / 90;
    yVector = 1 - (angleDeg + 90) / 90;
  }

  speed = 10;
  xV = xVector;
  yV = yVector;

  // Move the player location by the mouse position
  if (
    (player.locX < 5 && player.xVector < 0) ||
    (player.locX > 500 && xV > 0)
  ) {
    player.locY -= speed * yV;
  } else if ((player.locY < 5 && yV > 0) || (player.locY > 500 && yV < 0)) {
    player.locX += speed * xV;
  } else {
    player.locX += speed * xV;
    player.locY -= speed * yV;
  }
});
