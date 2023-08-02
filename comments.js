// Create web server
// 1. Create a web server
// 2. Create a route for the path '/comments'
// 3. Send a JSON response of an array of comments
// 4. Listen on port 3000

const http = require('http');

const server = http.createServer((req, res) => {
    if (req.url === '/comments') {
        const comments = [
            { name: 'John', message: 'Hello' },
            { name: 'Jack', message: 'Hi' }
        ];
        res.end(JSON.stringify(comments));
    } else {
        res.end('Invalid URL');
    }
});

server.listen(3000);
console.log('Server listening on port 3000');