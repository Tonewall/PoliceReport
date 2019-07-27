var express = require('express');
var router = express.Router();
const sql = require('mssql');

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log("inside cad data");
    const config = {
        server:'130.207.68.107',
        user:'healthservices',
        password:'TimHSp2019!',
        database:'CADSQL_NET',
        port:1433,
        options: {
            encrypt: false
        }
    };

    const conn = new sql.ConnectionPool(config);
    conn.connect(function (err) {

        if (err) throw err;
        const req = new sql.Request(conn);
        req.query("select * from vwHealthServices", function(err, recordset) {
            if(err) {
             res.send("there was an error inside cad data")
            }
            else{
                console.log("inside cad router");
                res.send(recordset);
            }
        });
    });

});

module.exports = router;