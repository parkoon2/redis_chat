const http = require('http'),
      mysql = require('mysql'),
      db_config = require('./common/db_config'),
      socket_stream = require('socket.io-stream'),
      socket = require('socket.io'),
      path = require('path'),
      fs = require('fs'),
      postgresql = require("pg");
      

let port, pool, server;

if ( !process.argv[2] ) {
    console.log('write port number!');
    process.exit(1);
}

port = process.argv[2];

server = http.createServer ().listen(port);
io = socket().listen(server);
console.log(`Core Server(DB Server) listen ${ port } port!`);


/**
 * Socket (File transfer)
 */
io.on('connection', function (socket) {
    console.log('ddhkㅏㅏ')
    socket_stream(socket).on('upload', function(stream, data) {
        var filename = path.basename(data.name);
        console.log(filename);
        stream.pipe(fs.createWriteStream(filename));
    });
})

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


