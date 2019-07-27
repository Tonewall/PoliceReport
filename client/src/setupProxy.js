const setupProxy = require("http-proxy-middleware");

module.exports = function(app) {
    app.use(
        setupProxy(["/api"], {
              target: "http://localhost:5000",
            headers: { Connection: "keep-alive" }
        })
    );
};