"use strict"

const yargs = require('yargs');

const argv = yargs
    .option('config',{
        alias: 'j',
        description: 'settings JSON file name',
        type: 'string',
        required: true
    })
    .help()
    .alias('help', '?').argv;


const fs = require('fs');
fs.copyFileSync(argv.config,'./settings.json');

const config = require('config.json')('./settings.json');
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

/**
 * Interprocess Communications (IPC) between HTML-UI and Node
 */
 ipcMain.on('open_browser', function(evt, url){
  var start = (process.platform == 'darwin'? 'open': process.platform == 'win32'? 'start': 'xdg-open');
  require('child_process').exec(start + ' ' + url);
  mainWindow.webContents.send('open_browser','success');
});