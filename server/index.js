console.log("\n\n[Server] Starting server on port 5000")

const app = require('express')();
const body_parser = require('body-parser');

// add body parser for post method
app.use(body_parser.json());    // json encoded
app.use(body_parser.urlencoded({extended: true}));  // url encoded

// add router
require('./router')(app);

// Open connection from external ip
app.listen(5000, '0.0.0.0');