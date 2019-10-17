
const app = require('express')();

console.log("\n\n/////***** Server Initializing *****/////\n")

// add router
require('./router')(app);

// Open connection from external ip
app.listen(5000, '0.0.0.0');