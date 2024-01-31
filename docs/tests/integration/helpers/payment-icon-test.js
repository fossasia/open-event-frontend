import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupIntegrationTest } from 'open-event-frontend/tests/helpers/setup-integration-test';
import { render } from '@ember/test-helpers';

module('Integration | Helper | payment-icon', function(hooks) {
  setupIntegrationTest(hooks);

  test('it renders', async function(assert) {
    this.set('inputIcon', 'Visa');
    await render(hbs`{{payment-icon inputIcon}}`);
    assert.equal(this.element.textContent.trim(), 'big cc visa icon');

    this.set('inputIcon', 'MasterCard');
    await render(hbs`{{payment-icon inputIcon}}`);
    assert.equal(this.element.textContent.trim(), 'big cc mastercard icon');

    this.set('inputIcon', 'American Express');
    await render(hbs`{{payment-icon inputIcon}}`);
    assert.equal(this.element.textContent.trim(), 'big cc amex icon');

  });
});
