require('dotenv').config();

const FastBootAppServer = require('fastboot-app-server');
const { injectEnvironment } = require('./replace-config');

const enableGzip = process.env.FASTBOOT_GZIP || 'true';
const fastbootDistPath = process.env.FASTBOOT_DIST_PATH || './dist';
const enableChunkedResponse = process.env.FASTBOOT_CHUNKED_RESPONSE || 'true';
const fastbootHost = process.env.FASTBOOT_HOST || '0.0.0.0';
const fastbootPort = process.env.FASTBOOT_PORT || process.env.PORT || '4000';
const fastbootWorkers = process.env.FASTBOOT_WORKERS || '1';

const serverOptions = {
  distPath        : fastbootDistPath,
  gzip            : enableGzip === 'true',
  host            : fastbootHost,
  port            : parseInt(fastbootPort),
  chunkedResponse : enableChunkedResponse === 'true',
  workerCount     : parseInt(fastbootWorkers)
};

if (process.env.SENTRY_DSN) {
  Sentry = require('@sentry/node');
  Sentry.init({ dsn: process.env.SENTRY_DSN });
  serverOptions.sandboxGlobals = { FastBootRaven: Sentry };
}

if (process.env.INJECT_ENV === 'true') {
  injectEnvironment();
}

const fastbootServer = new FastBootAppServer(serverOptions);

fastbootServer.start();
