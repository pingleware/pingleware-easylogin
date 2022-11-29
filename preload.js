const {contextBridge, ipcRenderer} = require("electron");

let validChannels = [
    "open_browser","error"
];

contextBridge.exposeInMainWorld(
  "api", {
    send: (channel, data) => {
      try {
        if (validChannels.includes(channel)) {
          ipcRenderer.send(channel, data);
        }  
      } catch(error) {
      }
    },
    receive: (channel, func) => {
      try {
        if (validChannels.includes(channel)) {
          ipcRenderer.on(channel, function(event, args) {
            func(channel, event, args)
          });
        }
      } catch(error) {
      }
    }
  }
);

const config = require('config.json')('./settings.json');

console.log(config.logins);

localStorage.setItem("logins",JSON.stringify(config.logins));

const package = require('./package.json');
localStorage.setItem('version',package.version);