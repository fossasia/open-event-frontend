import Component from '@ember/component';
import { computed } from '@ember/object';
import { htmlSafe } from '@ember/string';


export default Component.extend({
  json: computed(function() {
    return htmlSafe(syntaxHighlight(
      '{\n "name": "Sample event",\n "starts_at" : "2017-03-10T17:00:0",\n "ends_at":"2017-03-12T17:00:0"\n}'
    ));
  })
});

function syntaxHighlight(json) {
  json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][/+\-/]?\d+)?)/g, function(match) {
    let cls = 'number';
    if (/^"/.test(match)) {
      if (/:$/.test(match)) {
        cls = 'key';
      } else {
        cls = 'string';
      }
    } else if (/true|false/.test(match)) {
      cls = 'boolean';
    } else if (/null/.test(match)) {
      cls = 'null';
    }
    return `<span class=" ${cls}"> ${match}</span>`;
  });
}
