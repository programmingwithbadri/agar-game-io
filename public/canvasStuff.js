// Canvas Drawing
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

  // draw all the players we got from the socket server
  players.forEach((p) => {
    context.beginPath();
    context.fillStyle = p.color;
    // arg1,2 = x,y of the center of the arc
    // arg3 = radius
    // arg4 = where to start on the circle in radians, 0 = 3:00
    // arg5 = where to stop in radians
    context.arc(p.locX, p.locY, p.radius, 0, Math.PI * 2);
    // context.arc(200,200,10,0,Math.PI*2)
    context.fill();
    context.lineWidth = 3;
    context.strokeStyle = "rgb(0,255,0)";
    context.stroke();
  });

  // Draw all the orbs got from socket server
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

  player.xVector = xVector;
  player.yVector = yVector;
});
