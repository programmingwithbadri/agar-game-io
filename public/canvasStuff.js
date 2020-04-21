function init() {
  draw();
}

// Canvas Drawing
let randomX = Math.floor(500 * Math.random() + 10);
let randomY = Math.floor(500 * Math.random() + 10);
function draw() {
  // Context was set as 2D in the uiStuff.js
  context.beginPath();
  context.fillStyle = "rgb(255,0,0)";

  // Arc will create the circle/semi
  // Arg1, 2 - X,Y of the center of arc
  // Arg 3 - Radius of the circle
  // Arg 4 - Start of the Radian. For eg) 0 - 3 o clock position
  // Arg 5 - stop of radian. Here its 3
  context.arc(randomX, randomY, 10, 0, Math.PI * 2);
  context.fill();

  // Will add border around the circle
  context.lineWidth = 3;
  context.strokeStyle = "rgb(0,255,0)";
  context.stroke();

  // Recursively calls the draw method to update the canvas 
  // based on x and y axis that will be provided by mouse move in the UI
  requestAnimationFrame(draw);
}