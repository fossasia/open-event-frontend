import { test } from 'ember-qunit';
import moduleForComponent from 'open-event-frontend/tests/helpers/component-helper';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('modals/event-delete-modal', 'Integration | Component | modals/event delete modal');

test('it renders', function(assert) {
  this.set('isOpen', false);
  this.set('eventName', 'sample');
  this.set('deleteEvent', () => {});
  this.render(hbs`{{modals/event-delete-modal isOpen=isOpen eventName=eventName deleteEvent=(action deleteEvent)}}`);
  assert.ok(this.$().html().trim().includes('Are you sure'));
});
