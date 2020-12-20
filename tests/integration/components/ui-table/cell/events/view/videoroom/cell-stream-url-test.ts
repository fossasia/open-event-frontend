import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import EmberObject from '@ember/object';

module('Integration | Component | ui-table/cell/events/view/videoroom/cell-stream-url', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.owner.lookup('router:main').setupRouter();
  })

  test('it renders', async function(assert) {
    const record = EmberObject.create({ id: 23, name: 'Main Hall', slugName: 'main-hall' })
    const extraRecords = EmberObject.create({ identifier: 45, event: { identifier: 'abcd' } });
    this.set('record', record);
    this.set('extraRecords', extraRecords);
    await render(hbs`{{ui-table/cell/events/view/videoroom/cell-stream-url record=record extraRecords=extraRecords}}`);
    assert.ok(this.element.querySelector('a'));
    this.set('record', null);
    assert.notOk(this.element.querySelector('a'));
  });
});
