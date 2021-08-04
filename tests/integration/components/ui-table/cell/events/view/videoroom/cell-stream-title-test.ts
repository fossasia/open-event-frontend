import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | ui-table/cell/events/view/videoroom/cell-stream-title', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    this.set('record', 'Workshop');
    this.set('extraRecords', { videoStream: { id: 1 } });
    this.set('props', { actions: { delete() {} } }); // eslint-disable-line @typescript-eslint/no-empty-function
    await render(hbs`{{ui-table/cell/events/view/videoroom/cell-stream-title record=record extraRecords=extraRecords props=props}}`);
    assert.dom(this.element).hasText('Workshop');
    assert.ok(this.element.querySelector('.edit.icon'));
    assert.ok(this.element.querySelector('.trash.icon'));
    assert.notOk(this.element.querySelector('.video.icon'));
    this.set('extraRecords', { videoStream: {} });
    assert.notOk(this.element.querySelector('.edit.icon'));
    assert.notOk(this.element.querySelector('.trash.icon'));
    assert.ok(this.element.querySelector('.video.icon'));
  });
});
