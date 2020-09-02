import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupIntegrationTest } from 'open-event-frontend/tests/helpers/setup-integration-test';
import { render } from '@ember/test-helpers';

module('Integration | Helper | not-includes', function(hooks) {
  setupIntegrationTest(hooks);

  test('it works', async function(assert) {
    this.set('targetString', 'this is a string');
    this.set('testString', 'is a');
    await render(hbs`{{if (not-includes targetString testString) 'the target does not have the test string' 'the target has the test string'}}`);
    assert.equal(this.element.textContent.trim(), 'the target has the test string');

    this.set('testString', 'xyzzy');
    await render(hbs`{{if (not-includes targetString testString) 'the target does not have the test string' 'the target has the test string'}}`);
    assert.equal(this.element.textContent.trim(), 'the target does not have the test string');
  });

  test('it fails graciously', async function(assert) {
    await render(hbs`{{if (not-includes 122 44) 'the target does not have the test string' 'the target has the test string'}}`);
    assert.equal(this.element.textContent.trim(), 'the target does not have the test string');

    await render(hbs`{{if (not-includes null null) 'the target does not have the test string' 'the target has the test string'}}`);
    assert.equal(this.element.textContent.trim(), 'the target does not have the test string');
  });
});

