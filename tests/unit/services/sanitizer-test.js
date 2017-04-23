import { test } from 'ember-qunit';
import moduleFor from 'open-event-frontend/tests/helpers/unit-helper';

moduleFor('service:sanitizer', 'Unit | Service | sanitizer', []);

test('it exists and works', function(assert) {
  let service = this.subject();
  let sanitizedString = service.purify('<p style="background-color: green" class="big">This is an unclosed paragraph tag');
  assert.ok(sanitizedString === '<p>This is an unclosed paragraph tag</p>', sanitizedString);

  sanitizedString = service.purify('<script>console.log("this is an XSS attempt");</script>');
  assert.ok(sanitizedString === '', sanitizedString);

  sanitizedString = service.purify('<script src="https:/hackers.inc/xss.js"></script>');
  assert.ok(sanitizedString === '', sanitizedString);

  sanitizedString = service.purify('<script src="https:/hackers.inc/xss.js">');
  assert.ok(sanitizedString === '', sanitizedString);
});
