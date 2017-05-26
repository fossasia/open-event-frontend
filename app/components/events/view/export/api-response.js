import Ember from 'ember';

const { Component, computed, String } = Ember;

export default Component.extend({
  json: computed(function() {
    var sample = '{\n "name": "Sample event",\n "starts_at" : "2017-03-10T17:00:0",\n "ends_at":"2017-03-12T17:00:0"\n}';
    return String.htmlSafe(syntaxHighlight(sample));
  })
});

function syntaxHighlight(json) {
  json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function(match) {
    var cls = 'number';
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
