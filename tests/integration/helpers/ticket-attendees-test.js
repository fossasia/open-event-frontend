import { module, test } from 'qunit';
import { setupIntegrationTest } from 'open-event-frontend/tests/helpers/setup-integration-test';
import hbs from 'htmlbars-inline-precompile';
import { render } from '@ember/test-helpers';

module('Integration | Helper | ticket-attendees', function(hooks) {
  setupIntegrationTest(hooks);
  test('it renders', async function(assert) {
    this.set('array1', ['1', '2', '3', '4', '5']);
    this.set('array2', ['a', '1', '3', 'b']);
    await render(hbs`{{ticket-attendees array1 array2}}`);
    assert.equal(this.element.textContent.trim(), 2);
  });
});

