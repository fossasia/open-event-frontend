import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | ui-table/cell/events/view/videoroom/cell-stream-url', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    this.set('record', { id: 23, name: 'Main Hall', slugName: 'main-hall' });
    this.set('extraRecords', { event: { identifier: 'abcd' } });
    await render(hbs`{{ui-table/cell/events/view/videoroom/cell-stream-url record=record extraRecords=extraRecords}}`);
    assert.ok(this.element.querySelector('a'));
    this.set('record', null);
    assert.notOk(this.element.querySelector('a'));
  });
});
