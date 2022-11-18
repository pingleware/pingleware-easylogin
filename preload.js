const config = require('./easylogin.json');

console.log(config.logins);

localStorage.setItem("logins",JSON.stringify(config.logins));
