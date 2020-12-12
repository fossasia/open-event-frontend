import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | ui-table/cell/events/view/videoroom/cell-stream-url', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    this.set('record', { get(dataType: string) {
      switch (dataType) {
        case 'id':
          return 23
        case 'name':
          return 'Main Hall'
        case 'slugName':
          return 'main-hall'
        default:
          return
      }
    } });
    this.set('extraRecords', {
      identifier : 'ds5fe45s',
      event      : { get(dataType: string) {
        switch (dataType) {
          case 'identifier':
            return 'd2e1d5626'
          default: return;
        }
      } } });
    await render(hbs`{{ui-table/cell/events/view/videoroom/cell-stream-url record=record extraRecords=extraRecords}}`);
    assert.ok(this.element.querySelector('div'));
    this.set('record', null);
    assert.notOk(this.element.querySelector('div'));
  });
});
