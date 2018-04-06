import { find } from '@ember/test-helpers';
import { run } from '@ember/runloop';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | modals/tax info modal', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', function(assert) {

    const store = this.owner.lookup('service:store');

    this.set('isOpen', false);
    this.set('taxInfo', run(() => store.createRecord('tax')));
    this.set('hasTaxInfo', false);

    this.render(hbs`{{modals/tax-info-modal isOpen=isOpen tax=taxInfo hasTaxInfo=hasTaxInfo}}`);

    assert.ok(find('*').innerHTML.trim().includes('Add tax information'));
  });
});
