require('dotenv').config()

const FastBootAppServer = require('fastboot-app-server');
const { injectEnvironment } = require('./replace-config');

const enableGzip = process.env.FASTBOOT_GZIP || 'true';
const fastbootDistPath = process.env.FASTBOOT_DIST_PATH || '/fastboot/app';
const enableChunkedResponse = process.env.FASTBOOT_CHUNKED_RESPONSE || 'true';
const fastbootHost = process.env.FASTBOOT_HOST || '0.0.0.0';
const fastbootPort = process.env.FASTBOOT_PORT || process.env.PORT || '4000';
const fastbootWorkers = process.env.FASTBOOT_WORKERS || '1';

let fastbootServer = new FastBootAppServer({
  distPath        : fastbootDistPath,
  gzip            : enableGzip === 'true',
  host            : fastbootHost,
  port            : parseInt(fastbootPort),
  chunkedResponse : enableChunkedResponse === 'true',
  workerCount     : parseInt(fastbootWorkers)
});

(async () => {
  if (process.env.INJECT_ENV === 'true') {
    await injectEnvironment();
  }

  fastbootServer.start();
})();
