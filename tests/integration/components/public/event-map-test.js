import { test } from 'ember-qunit';
import moduleForComponent from 'open-event-frontend/tests/helpers/component-helper';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('public/event-map', 'Integration | Component | public/event map');

let event = Object.create({ latitude: 37.7833, longitude: -122.4167, locationName: 'Sample event location address' });

test('it renders', function(assert) {
  this.set('event', event);
  this.render(hbs `{{public/event-map event=event}}`);
  assert.equal(this.$('.address p').text(), 'Sample event location address');
});
