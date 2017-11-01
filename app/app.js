/**
 * Add Module
 */
const http = require('http');
      express = require('express');
      path = require('path');
      index = require('./route/index');
      chat = require('./route/chat');
      socket = require('socket.io');

let app, server, port, io;

app = express();
server = http.createServer(app); 

//app.use(express.static(path.join(__dirname, 'public')))

/**
 * View EJS setting 
 */
app.set('views', __dirname + '/public/views');
app.set('view engine', 'ejs');

/**
 * Routing
 */
app.use('/', index);
app.use('/chat', chat);

/**
 * Port Check & Listen
 */
if ( !process.argv[2] ) {
    console.log('write port number in 3rd argument');
    process.exit(1);
} else {
    port = process.argv[2];
    server.listen(port);
    console.log(`App server is connected in ${ port } port`);
}

/**
 * Socket
 */
io = socket().listen(server);
io.on('connection', function (socket) {
    console.log(socket)
})






