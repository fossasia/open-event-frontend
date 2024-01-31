import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupIntegrationTest } from 'open-event-frontend/tests/helpers/setup-integration-test';
import { render } from '@ember/test-helpers';

module('Integration | Component | orders/ticket price', function(hooks) {
  setupIntegrationTest(hooks);

  test('it renders', async function(assert) {
    this.set('ticket', { type: 'free' });
    this.set('currency', 'USD');
    this.set('amount', 53.432);
    await render(hbs`{{orders/ticket-price ticket=ticket currency=currency amount=amount}}`);
    assert.equal(this.element.textContent?.trim(), 'Free');

    this.set('ticket', { type: 'paid' });
    assert.equal(this.element.textContent?.trim(), '$53.43');

    this.set('currency', 'GBP');
    assert.equal(this.element.textContent?.trim(), '£53.43');
  });
});
