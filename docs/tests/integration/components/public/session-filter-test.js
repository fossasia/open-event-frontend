import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupIntegrationTest } from 'open-event-frontend/tests/helpers/setup-integration-test';
import { render } from '@ember/test-helpers';

module('Integration | Component | public/session filter', function(hooks) {
  setupIntegrationTest(hooks);

  const tracks = { '1': { name: 'Track 1', id: '1' } };

  test('it renders', async function(assert) {
    this.set('tracks', tracks);
    await render(hbs `{{public/session-filter tracks=tracks}}`);
    assert.ok(this.element.innerHTML.trim().includes('Track'));
  });
});
