let socket = io.connect("http://localhost:9000");
socket.on("init", (data) => {
  orbs = data.orbs;
});
