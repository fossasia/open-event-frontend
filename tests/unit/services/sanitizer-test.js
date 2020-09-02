import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Service | sanitizer', function(hooks) {
  setupTest(hooks);

  test('it exists and works', function(assert) {
    const service = this.owner.lookup('service:sanitizer');
    let sanitizedString = service.purify('<p style="background-color: green" class="big">This is an unclosed paragraph tag');
    assert.ok(sanitizedString === '<p>This is an unclosed paragraph tag</p>', sanitizedString);

    sanitizedString = service.purify('<script>console.log("this is an XSS attempt");</script>');
    assert.ok(sanitizedString === '', sanitizedString);

    sanitizedString = service.purify('<script src="https:/hackers.inc/xss.js"></script>');
    assert.ok(sanitizedString === '', sanitizedString);

    sanitizedString = service.purify('<script src="https:/hackers.inc/xss.js">');
    assert.ok(sanitizedString === '', sanitizedString);

    assert.equal(service.purify('<a href="www.google.com">Google</a>'), '<a rel="nofollow noopener" target="_blank" href="www.google.com">Google</a>');
  });

  test('test strip', function(assert) {
    const service = this.owner.lookup('service:sanitizer');

    assert.equal(service.strip('<p>This is amazing</p><br /><a href="google.com">Google</a>'), 'This is amazingGoogle');
  });
});
