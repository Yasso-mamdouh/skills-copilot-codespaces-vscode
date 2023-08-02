// Create Web Server
// Run: node comment.js
// Access: http://localhost:3000/comments
// Access: http://localhost:3000/comments/1
// Access: http://localhost:3000/comments/2
// Access: http://localhost:3000/comments/3
// Access: http://localhost:3000/comments/4
// Access: http://localhost:3000/comments/5
// Access: http://localhost:3000/comments/6
// Access: http://localhost:3000/comments/7
// Access: http://localhost:3000/comments/8
// Access: http://localhost:3000/comments/9
// Access: http://localhost:3000/comments/10
// Access: http://localhost:3000/comments/11
// Access: http://localhost:3000/comments/12

// Load modules
const http = require('http');
const fs = require('fs');
const url = require('url');
const qs = require('querystring');
const ejs = require('ejs');

// Load templates
const index_page = fs.readFileSync('./index.ejs', 'utf8');
const other_page = fs.readFileSync('./other.ejs', 'utf8');
const style_css = fs.readFileSync('./style.css', 'utf8');

// Load comments
const comment_data = [
  { name: 'Taro', message: 'Hello!' },
  { name: 'Hanako', message: 'Hi!' },
  { name: 'Sachiko', message: 'Good evening!' },
  { name: 'Ichiro', message: 'Good morning!' },
  { name: 'Jiro', message: 'Good afternoon!' },
];

// Create Web Server
var server = http.createServer(getFromClient);

// Start Web Server
server.listen(3000);
console.log('Server start!');

// Processing Request
function getFromClient(request, response) {
  var url_parts = url.parse(request.url, true);
  switch (url_parts.pathname) {
    case '/':
      response_index(request, response);
      break;

    case '/other':
      response_other(request, response);
      break;

    case '/style.css':
      response.writeHead(200, { 'Content-Type': 'text/css' });
      response.write(style_css);
      response.end();
      break;

    default:
      response.writeHead(200, { 'Content-Type': 'text/plain' });
      response.end('