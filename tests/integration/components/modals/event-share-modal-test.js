import { test } from 'ember-qunit';
import moduleForComponent from '../../../helpers/component-helper';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('modals/event-share-modal', 'Integration | Component | modals/event share modal');

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.set('isOpen', false);
  this.set('event', {});
  this.render(hbs`{{modals/event-share-modal isOpen=isOpen event=event}}`);
  assert.ok(this.$().html().trim().includes('Share this event'));
});
