const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  playRequest: () => ipcRenderer.send("play-request"),
  closeRequest: () => ipcRenderer.send("close-request"),
  collapseRequest: () => ipcRenderer.send("collapse-request"),
  discordRequest: () => ipcRenderer.send("discord-request"),
});
