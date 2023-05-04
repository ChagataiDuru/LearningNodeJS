import http from 'http';

const hostname = '127.0.0.1';
const port = 3000;

type Employee = {
  name: string;
  age: number;
  id: number;
  email: string;
  manager: Manager;

};

type Manager = {
  name: string;
  age: number;
  id: number;
  email: string;

};

const server = http.createServer(function(req, res) {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello NodeJS\n');
});

server.listen(port, hostname, function() {
  console.log('Server running at http://'+ hostname + ':' + port + '/');
});

