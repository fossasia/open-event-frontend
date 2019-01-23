const FastBootAppServer = require('fastboot-app-server');

let server = new FastBootAppServer({
  distPath        : '/fastboot/app',
  gzip            : true,
  host            : '0.0.0.0',
  port            : 4000,
  chunkedResponse : true
});

server.start();
