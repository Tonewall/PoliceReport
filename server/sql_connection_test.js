const sql = require("mssql");
const config = require('./db_config')
const read = require('read')

var conn = null

connect_to_db = async (q1, q2) => {
    promise1 = new Promise(async (res, err) => {
        read({prompt: q1}, (err, result, def)=>{
            res(result)
        })
    })
    username = await promise1
    promise2 = new Promise(async (res, err) => {
        read({prompt: q2, silent: true, replace: '*'}, (err, result, def)=>{
            res(result)
        })
    })
    password = await promise2
    config.user = username;
    config.password = password;
    pool = new sql.ConnectionPool(config)
    pool.connect().then(()=>console.log(pool))
};

connect_to_db('GT username: ', 'Password: ')