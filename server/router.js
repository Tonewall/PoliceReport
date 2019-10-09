// Modules for Microsoft sql server connection.
const sql = require("msnodesqlv8");
const connectionString = "server=gtpd-curie;Database=CrimeAnalytics;Trusted_Connection=Yes;Driver={SQL Server Native Client 11.0}";

// Contains methods for generating common query.
const query_factory = require("./query_factory");

// Ensure mutual exclusive operation on sql server.
//  * every query must have a timeout to avoid deadlock
const {Mutex} = require('async-mutex');
const db_mutex = new Mutex();

// Common api for querying
function db_query(query_string, next)
{
    db_mutex.acquire().then((release) =>
    {
        sql.query(connectionString, query_string, (err, result)=>
        {
            next(err, result);
            release();
        });
    });
}

// Router
function add_router(app)
{
    app.get('/showall', function(req, res)
    {
        queryString = query_factory.get_query();
        db_query(queryString, (err, result) => {
            if(!err) res.send(result);
            else res.status(500).send(err);
        });
    });

    app.get('/direct_query/:query', function(req, res)
    {
        console.log(req.params.query);
        db_query(req.params.query, (err, result) => {
            if(!err) res.send(result);
            else res.status(500).send({error: "database failure"});
        });
    });
}

module.exports = function(app)
{
    add_router(app);
    console.log("Router successfully applied.");
}
