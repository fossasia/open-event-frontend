/* eslint-disable no-console */
const cli = require('ember-cli');
const fs = require('fs');
const async = require('async');

/**
 * Start an ember CLI command and return a promise
 *
 * @return Promise
 */
function runEmberCommand() {
  const promise = cli({
    cliArgs      : [...arguments],
    inputStream  : process.stdin,
    outputStream : process.stdout,
    errorStream  : process.stderr
  });
  promise.then(function() {
    console.log('task completed');
  }).catch(e => {
    console.log('task failed');
    console.error(e);
  });
  return promise;
}

const translationFiles = fs.readdirSync('translations').filter(fileName => fileName.endsWith('po'));


function extractStrings() {
  return runEmberCommand('l10n:extract');
}

function mergeUpdatedTranslation() {
  async.eachSeries(translationFiles, function(fileName, callback) {
    runEmberCommand('l10n:extract', '-g', '-l', fileName.split('.')[0]).then(() => {
      callback();
    }).catch(console.error);
  });
}

function generateTranslationJsonFiles() {
  async.eachSeries(translationFiles, function(fileName, callback) {
    runEmberCommand('l10n:convert', '-l', fileName.split('.')[0]).then(() => {
      callback();
    }).catch(console.error);
  });
}

switch (process.argv[2]) {
  case 'extract':
    extractStrings();
    break;
  case 'update':
    mergeUpdatedTranslation();
    break;
  case 'generate':
    generateTranslationJsonFiles();
    break;
  default:
    console.error('Invalid argument.');
}
