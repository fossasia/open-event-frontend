import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupIntegrationTest } from 'open-event-frontend/tests/helpers/setup-integration-test';
import { render } from '@ember/test-helpers';

module('Integration | Component | footer main', function(hooks) {
  setupIntegrationTest(hooks);

  const eventLocations = [
    {
      name : 'Berlin',
      slug : 'berlin'
    },
    {
      name : 'New Delhi',
      slug : 'new-delhi'
    }
  ];

  const eventTypes = [
    {
      name : 'Conference',
      slug : 'conference'
    },
    {
      name : 'Meetup',
      slug : 'meetup'
    }
  ];


  test('it renders', async function(assert) {
    this.set('eventTypes', eventTypes);
    this.set('eventLocations', eventLocations);
    await render(hbs`{{footer-main l10n=l10n eventLocations=eventLocations eventTypes=eventTypes}}`);
    assert.dom(this.element).includesText('footer');
  });
});
