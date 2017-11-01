const http = require('http'),
      socket = require('socket.io'),
      redis = require('socket.io-redis'),
      redis_config = require('./common/redis_config');

let server, port, io

server = http.createServer();

/**
 * Port Check & Listen
 */
if ( !process.argv[2] ) {
    console.log('write port number in 3rd argument');
    process.exit(1);
} 

port = process.argv[2];
server.listen(port);
io = socket().listen(server);
console.log(`Signal server(socket server) is connected in ${ port } port`);

/**
 * Redis 
 * need to redis server's host and port
 */
io.adapter(redis(redis_config)); 

/**
 * Socket
 */
io.on('connection', function (socket) {
    console.log(`${ socket.id } is connected!`);
    socket.on('chat', function (data) {
        socket.broadcast.emit('chat', data);
    })
})
