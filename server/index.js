
const app = require('express')();

console.log("\n\n[Server] Starting server on port 5000")

// add router
require('./router')(app);

// Open connection from external ip
app.listen(5000, '0.0.0.0');