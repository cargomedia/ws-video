#!/usr/bin/env node

var http = require('http');
var websocketServer = require('websocket').server;
var fs = require('fs');
var connect = require('connect');
var serveStatic = require('serve-static');

var staticPort = 1234;
connect().use(serveStatic(__dirname + '/../static')).listen(staticPort, function() {
  console.log('HTTP server listening on port ' + staticPort);
});

var websocketPort = 8090;
var http = http.createServer(function(request, response) { });
http.listen(websocketPort, function() {
  console.log('WebSocket server listening on port ' + websocketPort);
});

var websocket = new websocketServer({ httpServer: http });
websocket.on('request', function(request) {
  var connection = request.accept(null, request.origin);
  connection.binaryType = "arraybuffer";
  console.log('WS connect');

  var data = fs.readFileSync('static/video/test.webm');
  connection.sendBytes(data);

  connection.on('close', function(connection) {
    console.log('WS disconnect');
  });
});
