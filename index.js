"use strict"

const config = require('config.json')('./easylogin.json');
const {app, BrowserWindow, ipcMain} = require("electron");
const path = require("path");

let mainWindow;

function createWindow () {
    mainWindow = new BrowserWindow({
      width: config.width,
      height: config.height,
      icon: path.join(__dirname, "assets/login.png"),
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: true,
        enableRemoteModule: false,
        preload: path.join(__dirname, "preload.js")
      }
    });

    mainWindow.loadFile("views/index.html");

    mainWindow.on("closed", function () {
      mainWindow = null;
    });
    if (config.menu) {
        if (config.menu == "off") {
            mainWindow.setMenu(null);
        }
    } else {
        mainWindow.setMenu(null);
    }
    mainWindow.setResizable(true);
}

app.on("ready", createWindow);
app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});
app.on("activate", function () {
  if (mainWindow === null) createWindow();
});
