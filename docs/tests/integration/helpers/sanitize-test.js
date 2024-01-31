import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupIntegrationTest } from 'open-event-frontend/tests/helpers/setup-integration-test';
import { render } from '@ember/test-helpers';

module('Integration | Helper | sanitize', function(hooks) {
  setupIntegrationTest(hooks);

  test('it renders', async function(assert) {
    this.set('inputValue', '<p>hello</p>');
    await render(hbs`{{sanitize inputValue}}`);
    assert.equal(this.element.innerHTML.trim(), '<p>hello</p>');
    this.set('inputValue2', '<script>alert("xss");</script>');
    await render(hbs`{{sanitize inputValue}}`);
    assert.equal(this.element.innerHTML.trim(), '<p>hello</p>');
  });
});

