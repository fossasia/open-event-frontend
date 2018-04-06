import { find } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | widgets/forms/places autocomplete', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.actions = {};
    this.send = (actionName, ...args) => this.actions[actionName].apply(this, args);
  });

  test('it renders', function(assert) {
    this.actions.placeChanged = function() { };
    this.render(hbs`{{widgets/forms/places-autocomplete placeChangedCallback=(action 'placeChanged')}}`);
    assert.ok(find('*').innerHTML.trim().includes('place-autocomplete--input'));
  });
});
