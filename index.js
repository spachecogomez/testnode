const http = require('http');

const hostname = 'localhost';
const port = 8081

const server = http.createServer((req,res) => {
    res.status = 200;
    res.setHeader('Content-Type','text/plain');
    res.end('Response sent from node');
});

server.listen(port, hostname, () => {
    console.log('Servidor iniciado');
});