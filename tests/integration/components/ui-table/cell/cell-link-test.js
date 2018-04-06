import { find } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | ui table/cell/cell link', function(hooks) {
  setupRenderingTest(hooks);

  const record = { url: 'Event' };
  test('it renders', function(assert) {
    this.set('record', record);
    this.render(hbs `{{ui-table/cell/cell-link record=record}}`);
    assert.ok(find('*').innerHTML.trim().includes('Event'));
  });
});
