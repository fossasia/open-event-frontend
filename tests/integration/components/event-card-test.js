import Object from '@ember/object';
import { test } from 'ember-qunit';
import moduleForComponent from 'open-event-frontend/tests/helpers/component-helper';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('event-card', 'Integration | Component | event card');

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.set('event', Object.create({}));
  this.on('shareEvent', function() { });

  this.render(hbs`{{event-card event=event isWide=false shareEvent=(action 'shareEvent')}}`);

  assert.ok(this.$().html().trim().includes('event'));
});
