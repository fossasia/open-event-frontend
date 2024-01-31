import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupIntegrationTest } from 'open-event-frontend/tests/helpers/setup-integration-test';
import { render } from '@ember/test-helpers';

module('Integration | Component | sponsor item', function(hooks) {
  setupIntegrationTest(hooks);

  const sponsor = [
    { name: 'Sponsor 1', url: '#', logoUrl: 'https://placehold.it/150x60' }
  ];

  test('it renders', async function(assert) {
    this.set('sponsor', sponsor);
    await render(hbs `{{public/sponsor-item sponsor=sponsor}}`);
    assert.ok(this.element.innerHTML.trim().includes('img'));
  });
});
