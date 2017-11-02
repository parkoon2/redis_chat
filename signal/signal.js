const http = require('http'),
      socket = require('socket.io'),
      socket_client = require('socket.io-client'),
      socket_stream = require('socket.io-stream'),
      path = require('path'),
      fs = require('fs'),
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
 * Socket (File transfer)
 */
let file_socket = socket_client.connect('http://localhost:5000');
let stream = socket_stream.createStream();
let filename = 'test.png';

socket_stream(file_socket).emit('upload', stream, { name: filename });
fs.createReadStream(filename).pipe(stream);

/**
 * Socket
 */
io.on('connection', function (socket) {
    console.log(`${ socket.id } is connected!`);
    socket.on('chat', function (data) {
        socket.broadcast.emit('chat', data);
    });

    // socekt_stream(socket).on('upload', function (stream, data) {
    //     let fn = path.basename(data.name);
    //     stream.pipe(fs.createWriteStream(fn));
    // });
});
