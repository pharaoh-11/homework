const http = require('http');
const requestHandler = require('./requestHandler');

const PORT = 3000;

const server = http.createServer(requestHandler);

function start() {
  server.listen(PORT, () => {
    console.log(`Server successfully started on port ${PORT}`);
  });
}

function stop(callback) {
  server.close((err) => {
    if (err) {
      console.log(err, 'Failed to close the server');
      callback();
      return;
    }
    console.log('Server has been stopped');
    callback();
  });
}

module.exports = { start, stop };
