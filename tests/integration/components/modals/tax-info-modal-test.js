import { hbs } from 'ember-cli-htmlbars';
import { run } from '@ember/runloop';
import { module, test } from 'qunit';
import { setupIntegrationTest } from 'open-event-frontend/tests/helpers/setup-integration-test';
import { render } from '@ember/test-helpers';

module('Integration | Component | modals/tax info modal', function(hooks) {
  setupIntegrationTest(hooks);

  test('it renders', async function(assert) {

    const store = this.owner.lookup('service:store');

    this.set('isOpen', false);
    this.set('taxInfo', run(() => store.createRecord('tax')));
    this.set('hasTaxInfo', false);

    await render(hbs`{{modals/tax-info-modal isOpen=isOpen tax=taxInfo hasTaxInfo=hasTaxInfo}}`);

    assert.ok(this.element.innerHTML.trim().includes('Add tax information'));
  });
});
