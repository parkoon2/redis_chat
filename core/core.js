const http = require('http'),
      mysql = require('mysql'),
      db_config = require('./common/db_config'),
      postgresql = require("pg");
      

let port, pool, server;

if ( !process.argv[2] ) {
    console.log('write port number!');
    process.exit(1);
}

port = process.argv[2];

server = http.createServer ().listen(port);
console.log(`Core Server(DB Server) listen ${ port } port!`);

/**
 * Postgresql
 */
pool = new postgresql.Pool(db_config.postgresql);
pool.on('error', function (err, client) {
    console.error('idle client error', err.message, err.stack);
});

let testQuery = 'SELECT * FROM wgcptest.member';

pool.query(testQuery, function (err, result) {
    if (err) throw err;
    console.log(result.rows[0].idx)
})


