import { find } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | public/event map', function(hooks) {
  setupRenderingTest(hooks);

  let event = Object.create({ latitude: 37.7833, longitude: -122.4167, locationName: 'Sample event location address' });

  test('it renders', function(assert) {
    this.set('event', event);
    this.render(hbs `{{public/event-map event=event}}`);
    assert.equal(find('.address p').textContent, 'Sample event location address');
  });
});
