const { app, BrowserWindow } = require("electron");
if (require("electron-squirrel-startup")) app.quit();
const { updateElectronApp, UpdateSourceType } = require("update-electron-app");
updateElectronApp();
const { exec } = require("child_process");
const { ipcMain } = require("electron");
const path = require("node:path");

app.whenReady().then(() => {
  const win = new BrowserWindow({
    icon: "app.ico",
    width: 800,
    height: 500,
    resizable: false,
    autoHideMenuBar: true,
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, "app/preload.js"),
    },
  });

  ipcMain.on("play-request", (_) => {
    exec(path.join(__dirname, "scripts/test.exe"), (error, stdout, stderr) => {
      if (error) console.log(`Error while doing play request: ${error}`);
      if (stderr) console.log(`Std Error while doing play request: ${error}`);
      console.log(`Python output on play request: ${stdout}`);
    });
  });

  ipcMain.on("close-request", (_) => {
    win.close();
  });

  ipcMain.on("collapse-request", (_) => {
    win.minimize();
  });

  ipcMain.on("discord-request", (_) => {
    win.minimize();
    var start =
      process.platform == "darwin"
        ? "open"
        : process.platform == "win32"
        ? "start"
        : "xdg-open";
    require("child_process").exec(start + " https://discord.gg/RPTxRNfvrU");
  });

  win.loadFile("app/app.html");
});
