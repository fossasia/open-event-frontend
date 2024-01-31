require('dotenv').config();

const fs = require('fs');
const { merge } = require('lodash');

const env = require('../config/environment');
const appName = 'open-event-frontend';

function getEnv() {
  return env('production');
}

/**
 * Replace the fastboot-context config located within dist/package.json
 */
function replaceFastbootConfig() {
  const packagePath = './dist/package.json';
  const packageInfo = require(`.${packagePath}`);
  const old = packageInfo.fastboot.config[appName];
  process.env.npm_package_version = old.APP.version;
  packageInfo.fastboot.config[appName] = merge(old, getEnv());
  fs.writeFileSync(packagePath, JSON.stringify(packageInfo));
}

/**
 * Replace the config for the SPA by editing the config located inside the meta-tag.
 */
function replaceWebConfig() {
  const indexFilePath = './dist/index.html';
  const configPath = 'open-event-frontend/config/environment';
  const indexFileContent = fs.readFileSync(indexFilePath).toString();
  const regex = new RegExp(`name="${configPath}" content="([^"]+)"`, 'i');
  const existingEnvironment = JSON.parse(decodeURIComponent(regex.exec(indexFileContent)[1]));
  const newEnvironment = encodeURIComponent(JSON.stringify(merge(existingEnvironment, getEnv())));
  fs.writeFileSync(
    indexFilePath,
    indexFileContent.replace(
      regex,
      `name="${configPath}" content="${newEnvironment}"`
    )
  );
}

/**
 * Inject a modified environment config into the fastboot application.
 */
function injectEnvironment() {
  replaceFastbootConfig();
  replaceWebConfig();
}

module.exports = {
  injectEnvironment
};
