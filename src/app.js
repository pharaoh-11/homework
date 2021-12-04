const server = require('./server');

function enableGracefulShutdown() {
  const exitHandler = (error) => {
    if (error) console.log(error);
    console.log('Gracefully shutting shown');

    server.stop(() => process.exit());
  };

  process.on('SIGINT', exitHandler);
  process.on('SIGTERM', exitHandler);
  process.on('SIGUSR1', exitHandler);
  process.on('SIGUSR2', exitHandler);
  process.on('uncaughtException', exitHandler);
  process.on('unhandledRejection', exitHandler);
}

(() => {
  enableGracefulShutdown();
  server.start();
})();
