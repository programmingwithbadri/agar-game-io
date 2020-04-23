// Get window width and height
let windowHeight = $(window).height();
let windowWidth = $(window).width();

let player = {};
let orbs = [];
let players = [];

// Get the canvas to show in the window
let canvas = document.querySelector("#the-canvas");
let context = canvas.getContext("2d");
canvas.width = windowWidth;
canvas.height = windowHeight;

// Show the login modal when the page is loaded
$(window).load(() => {
  $("#loginModal").modal("show");
});

// Submit event
$(".name-form").submit((event) => {
  event.preventDefault();
  player.name = document.querySelector("#name-input").value;

  // Once user name added hide the login modal
  $("#loginModal").modal("hide");

  // Show the spawn modal
  $("#spawnModal").modal("show");
  document.querySelector(".player-name").innerHTML = player.name;
});

// Once game starts hide the modal
$(".start-game").click((event) => {
  $(".modal").modal("hide");
  $(".hiddenOnStart").removeAttr("hidden");

  // Initialize the canvas
  init();
});
