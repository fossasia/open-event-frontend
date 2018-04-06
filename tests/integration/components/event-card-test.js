import { find } from '@ember/test-helpers';
import Object from '@ember/object';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | event card', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.actions = {};
    this.send = (actionName, ...args) => this.actions[actionName].apply(this, args);
  });

  test('it renders', function(assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.set('event', Object.create({}));
    this.actions.shareEvent = function() { };

    this.render(hbs`{{event-card event=event isWide=false shareEvent=(action 'shareEvent')}}`);

    assert.ok(find('*').innerHTML.trim().includes('event'));
  });
});
