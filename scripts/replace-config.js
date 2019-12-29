require('dotenv').config()

const fs = require('fs');
const promisify = require('util').promisify
const { merge } = require('lodash')
const safeEval = require('safe-eval')

const env = require('../config/environment')
const appName = 'open-event-frontend'

const environment = env('production')

async function replaceFastbootConfig() {
  const packagePath = './dist/package.json'
  const packageInfo = require('.' + packagePath)

  const old = packageInfo.fastboot.config[appName]
  packageInfo.fastboot.config[appName] = merge(old, environment);
  await promisify(fs.writeFile)(packagePath, JSON.stringify(packageInfo))

  console.log('Transformed package.json with new environment')
}

function findObject(js, objectStart) {
  let braceCount = 1;

  const start = js.indexOf("{", objectStart);

  if (start < 0) {
    return null;
  }

  let index = start + 1;
  let parseBlocker = null;
  let parseBlockerBuffer = null;

  while (index < js.length) {
    const c = js[index];

    if (!parseBlocker && !parseBlockerBuffer) {
      if (c == "{") {
        braceCount += 1;
      } else if (c == "}") {
        braceCount -= 1;
      } else if (c === '"' || c === "'" || c === "`") {
        parseBlocker = c;
      } else if (js[index - 1] == "/") {
        if (c == "/") parseBlocker = "\n";
        else if (c == "*") parseBlockerBuffer = "*/";
      }

      if (braceCount === 0) {
        break;
      }
    } else {
      if (c === parseBlocker) {
        parseBlocker = null;
      } else if (c == '/' && js[index - 1] == '*') {
        parseBlockerBuffer = null;
      }
    }

    index++;
  }

  if (index >= js.length) return null;

  return {
    start,
    end: index
  };
}

function replace(str, start, end, replacement) {
  return str.substring(0, start) + replacement + str.substring(end + 1, str.length)
}

async function replaceWebConfig() {
  const pattern = new RegExp(`^${appName}.*\.js$`)
  const basePath = './dist/assets/'
  const appJs = (await promisify(fs.readdir)(basePath)).filter(name => name.match(pattern))

  const envDefinition = 'define("open-event-frontend/config/environment"'

  for (const js of appJs) {
    const jsPath = basePath + js;
    const code = (await promisify(fs.readFile)(jsPath)).toString()
    let defineIndex = code.indexOf(envDefinition)

    if (defineIndex < 0) {
      defineIndex = code.indexOf(envDefinition.replace(/"/g, "'"))
      if (defineIndex < 0)
        continue;
    }

    const defaultIndex = code.indexOf('default', defineIndex + 1)

    if (defaultIndex < 0)
      continue;
    
    // File with environment definition found

    console.log('Transforming ' + js)
    
    const object = findObject(code, defaultIndex)

    console.log('Environment Object Found', object)

    const webEnvJson = code.substring(object.start, object.end + 1)
    const old = safeEval('(' + webEnvJson + ')')
    
    const newEnv = JSON.stringify(merge(old, environment))
    const newCode = replace(code, object.start, object.end, newEnv)

    console.log('Injected new environment')

    await promisify(fs.writeFile)(jsPath, newCode)

    console.log('Transformation Complete')

    break;
  }
}

async function injectEnvironment() {
  await replaceFastbootConfig()
  await replaceWebConfig()
}

module.exports = {
  injectEnvironment
}
