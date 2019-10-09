
const app = require('express')();

console.log("\n\n/////***** Server Initializing *****/////\n")

// add router
require('./router')(app);

// Open connection from external ip
app.listen(8080, '0.0.0.0');

