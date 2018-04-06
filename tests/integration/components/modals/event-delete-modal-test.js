import { find } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | modals/event delete modal', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', function(assert) {
    this.set('isOpen', false);
    this.set('eventName', 'sample');
    this.set('deleteEvent', () => {});
    this.render(hbs`{{modals/event-delete-modal isOpen=isOpen eventName=eventName deleteEvent=(action deleteEvent)}}`);
    assert.ok(find('*').innerHTML.trim().includes('Are you sure'));
  });
});
