import { find } from '@ember/test-helpers';
import { run } from '@ember/runloop';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | forms/wizard/basic details step', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', function(assert) {

    const store = this.owner.lookup('service:store');

    this.set('data', {
      event: run(() => store.createRecord('event'))
    });
    this.render(hbs`{{forms/wizard/basic-details-step data=data isCreate=true}}`);
    assert.ok(find('*').innerHTML.trim().includes('location'));
  });
});
