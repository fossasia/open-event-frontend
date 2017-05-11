import { test } from 'ember-qunit';
import moduleForComponent from 'open-event-frontend/tests/helpers/component-helper';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('public/event-map', 'Integration | Component | public/event map', {
  integration: true
});

const location= { latitude: 37.7833, longitude: -122.4167, locationName: 'sample event location address' };

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{public/event-map}}`);

  assert.equal(this.$().text().trim(), 'location');
});
