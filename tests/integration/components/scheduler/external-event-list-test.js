import { find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';

module('Integration | Component | scheduler/external event list', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', function(assert) {
    this.render(hbs`{{scheduler/external-event-list}}`);
    assert.ok(find('*').innerHTML.trim().includes('Events'));
  });
});
