require('dotenv').config()

const fs = require('fs');
const promisify = require('util').promisify
const { merge } = require('lodash')

const env = require('../config/environment')
const appName = 'open-event-frontend'

const environment = env('production')

async function replaceFastbootConfig() {
  const packagePath = './dist/package.json'
  const packageInfo = require('.' + packagePath)

  const old = packageInfo.fastboot.config[appName]
  packageInfo.fastboot.config[appName] = merge(old, environment);
  await promisify(fs.writeFile)(packagePath, JSON.stringify(packageInfo))
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

async function replaceWebConfig() {
  const pattern = new RegExp(`^${appName}.*\.js$`)
  const basePath = './dist/assets/'
  const appJs = (await promisify(fs.readdir)(basePath)).filter(name => name.match(pattern))

  const envDefinition = 'define("open-event-frontend/config/environment"'

  for (const js of appJs) {
    const code = (await promisify(fs.readFile)(basePath + js)).toString()
    let defineIndex = code.indexOf(envDefinition)

    if (defineIndex < 0) {
      defineIndex = code.indexOf(envDefinition.replace(/"/g, "'"))
      if (defineIndex < 0)
        continue;
    }

    const defaultIndex = code.indexOf('default', defineIndex + 1)

    if (defaultIndex < 0)
      continue;
    
    const object = findObject(code, defaultIndex)

    const webEnvJson = code.substring(object.start, object.end + 1)
    const old = eval('(' + webEnvJson + ')')
    
    // File with environment definition found
    console.log('Transforming ' + js, object, JSON.stringify(old))
    console.log(JSON.stringify(merge(old, environment)))
  }
}

(async () => {
  await replaceFastbootConfig()
  await replaceWebConfig()
})();
