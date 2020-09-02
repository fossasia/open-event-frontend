import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupIntegrationTest } from 'open-event-frontend/tests/helpers/setup-integration-test';
import { render } from '@ember/test-helpers';

module('Integration | Component | public/event map', function(hooks) {
  setupIntegrationTest(hooks);

  const event = Object.create({ latitude: 37.7833, longitude: -122.4167, locationName: 'Sample event location address' });

  test('it renders', async function(assert) {
    this.set('event', event);
    await render(hbs `{{public/event-map event=event}}`);
    assert.dom('.address p').hasText('Sample event location address');
  });
});
