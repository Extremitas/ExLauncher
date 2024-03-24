let playButton = document.getElementById("playButton");
let closeButton = document.getElementById("closeButton");
let collapseButton = document.getElementById("collapseButton");
let discordButton = document.getElementById("discordButton");

let loginInput = document.getElementById("loginInput");

playButton.disabled = true;

closeButton.addEventListener("click", () => window.electronAPI.closeRequest());
collapseButton.addEventListener("click", () =>
  window.electronAPI.collapseRequest()
);
playButton.addEventListener("click", () => window.electronAPI.playRequest());
discordButton.addEventListener("click", () =>
  window.electronAPI.discordRequest()
);

loginInput.addEventListener("input", (event) => {
  playButton.disabled = loginInput.value.length < 3;
});
