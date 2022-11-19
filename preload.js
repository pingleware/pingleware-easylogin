const config = require('./settings.json');

console.log(config.logins);

localStorage.setItem("logins",JSON.stringify(config.logins));
