import { find } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | modals/event share modal', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', function(assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.set('isOpen', false);
    this.set('event', {});
    this.render(hbs`{{modals/event-share-modal isOpen=isOpen event=event}}`);
    assert.ok(find('*').innerHTML.trim().includes('Share this event'));
  });
});
