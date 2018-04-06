import { find } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | events/overview/event setup checklist', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', function(assert) {
    this.render(hbs`{{events/view/overview/event-setup-checklist}}`);
    assert.ok(find('*').innerHTML.trim().includes('Event setup checklist'));
  });
});
