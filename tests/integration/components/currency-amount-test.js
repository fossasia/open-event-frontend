import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | currency-amount', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {

    await render(hbs`<CurrencyAmount @amount={{14}} @currency={{'INR'}}/>`);
    assert.equal(this.element.textContent.trim(), '₹14.00');

    await render(hbs`<CurrencyAmount @amount={{0}} @currency={{'INR'}}/>`);
    assert.equal(this.element.textContent.trim(), '0.00');
  });
});
