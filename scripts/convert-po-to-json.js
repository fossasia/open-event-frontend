/* eslint-disable no-console */
/**
 * Converts .po files in /translations to .json files in /public/assets/locales/
 * This is a Windows-compatible alternative to `yarn l10n:generate` which requires gettext (Unix only).
 */
const fs = require('fs');
const path = require('path');

const translationsDir = path.join(__dirname, '..', 'translations');
const outputDir = path.join(__dirname, '..', 'public', 'assets', 'locales');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

/**
 * Minimal PO file parser that produces the same JSON structure as gettext/po2json
 */
function parsePo(content) {
  const result = {
    charset: 'utf-8',
    headers: {},
    translations: { '': {} }
  };

  // Normalise line endings
  const lines = content.replace(/\r\n/g, '\n').split('\n');

  let currentMsgid = null;
  let currentMsgidPlural = null;
  let currentMsgstr = [];
  let currentMsgstrIndex = 0;
  let inMsgid = false;
  let inMsgstr = false;
  let inMsgidPlural = false;
  let headersDone = false;

  function unescape(str) {
    return str
      .replace(/\\n/g, '\n')
      .replace(/\\t/g, '\t')
      .replace(/\\r/g, '\r')
      .replace(/\\"/g, '"')
      .replace(/\\\\/g, '\\');
  }

  function commitEntry() {
    if (currentMsgid === null) { return; }
    if (!headersDone && currentMsgid === '') {
      // Parse headers
      const headerText = currentMsgstr[0] || '';
      headerText.split('\n').forEach(line => {
        const idx = line.indexOf(':');
        if (idx === -1) { return; }
        const key = line.slice(0, idx).trim().toLowerCase();
        const val = line.slice(idx + 1).trim();
        result.headers[key] = val;
      });
      headersDone = true;
    } else if (currentMsgid !== '') {
      // Only add entries that have at least one non-empty translation
      const hasTranslation = currentMsgstr.some(s => s !== '');
      if (hasTranslation) {
        const entry = { msgid: currentMsgid, msgstr: currentMsgstr };
        if (currentMsgidPlural) {
          entry['msgid_plural'] = currentMsgidPlural;
        }
        result.translations[''][currentMsgid] = entry;
      }
    }
    currentMsgid = null;
    currentMsgidPlural = null;
    currentMsgstr = [];
    currentMsgstrIndex = 0;
    inMsgid = false;
    inMsgstr = false;
    inMsgidPlural = false;
  }

  for (const raw of lines) {
    const line = raw.trim();

    if (line === '' || line.startsWith('#')) {
      if (line === '' && (currentMsgid !== null)) {
        commitEntry();
      }
      inMsgid = false;
      inMsgstr = false;
      inMsgidPlural = false;
      continue;
    }

    if (line.startsWith('msgid_plural ')) {
      inMsgid = false;
      inMsgstr = false;
      inMsgidPlural = true;
      currentMsgidPlural = unescape(line.slice(13).replace(/^"|"$/g, ''));
      continue;
    }

    if (line.startsWith('msgid ')) {
      commitEntry();
      inMsgid = true;
      inMsgstr = false;
      inMsgidPlural = false;
      currentMsgid = unescape(line.slice(6).replace(/^"|"$/g, ''));
      continue;
    }

    const msgstrMatch = line.match(/^msgstr(\[(\d+)\])? /);
    if (msgstrMatch) {
      inMsgid = false;
      inMsgidPlural = false;
      inMsgstr = true;
      currentMsgstrIndex = msgstrMatch[2] !== undefined ? parseInt(msgstrMatch[2]) : 0;
      const valStart = line.indexOf(' ') + 1;
      currentMsgstr[currentMsgstrIndex] = unescape(line.slice(valStart).replace(/^"|"$/g, ''));
      continue;
    }

    // Continuation string
    if (line.startsWith('"')) {
      const val = unescape(line.replace(/^"|"$/g, ''));
      if (inMsgid) {
        currentMsgid += val;
      } else if (inMsgidPlural) {
        currentMsgidPlural += val;
      } else if (inMsgstr) {
        currentMsgstr[currentMsgstrIndex] = (currentMsgstr[currentMsgstrIndex] || '') + val;
      }
    }
  }

  // Commit last entry
  commitEntry();

  return result;
}

const poFiles = fs.readdirSync(translationsDir).filter(f => f.endsWith('.po'));

let count = 0;
for (const fileName of poFiles) {
  const locale = fileName.replace('.po', '');
  const poPath = path.join(translationsDir, fileName);
  const jsonPath = path.join(outputDir, `${locale}.json`);

  // Skip if JSON already exists and is newer
  if (fs.existsSync(jsonPath)) {
    const poStat = fs.statSync(poPath);
    const jsonStat = fs.statSync(jsonPath);
    if (jsonStat.mtimeMs >= poStat.mtimeMs) {
      console.log(`Skipping ${locale} (up to date)`);
      continue;
    }
  }

  console.log(`Converting ${locale}...`);
  try {
    const content = fs.readFileSync(poPath, 'utf-8');
    const json = parsePo(content);
    fs.writeFileSync(jsonPath, JSON.stringify(json, null, 2), 'utf-8');
    count++;
    console.log(`  → ${jsonPath}`);
  } catch (e) {
    console.error(`  ERROR converting ${locale}:`, e.message);
  }
}

console.log(`\nDone! Converted ${count} locale(s).`);
