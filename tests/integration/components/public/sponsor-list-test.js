import { hbs } from 'ember-cli-htmlbars';
import EmberObject from '@ember/object';
import { A } from '@ember/array';
import { module, test } from 'qunit';
import { setupIntegrationTest } from 'open-event-frontend/tests/helpers/setup-integration-test';
import { render } from '@ember/test-helpers';

module('Integration | Component | sponsor list', function(hooks) {
  setupIntegrationTest(hooks);

  const sponsors = A(
    [
      EmberObject.create({
        name        : 'Sponsor 1',
        url         : '#',
        logoUrl     : 'https://placehold.it/150x60',
        level       : 2,
        type        : 'Platinum Sponsor',
        description : ''
      }),
      EmberObject.create({
        name        : 'Sponsor 2',
        url         : '#',
        logoUrl     : 'https://placehold.it/150x60',
        level       : 1,
        type        : 'Gold Sponsor',
        description : ''
      }),
      EmberObject.create({
        name        : 'Sponsor 3',
        url         : '#',
        logoUrl     : 'https://placehold.it/150x60',
        level       : 1,
        type        : 'Silver Sponsor',
        description : ''
      })
    ]
  );

  test('it renders', async function(assert) {

    this.set('sponsors', sponsors);
    await render(hbs `{{public/sponsor-list sponsors=sponsors}}`);

    const element = assert.dom(this.element);
    element.includesText('Platinum Sponsor');
    element.includesText('Gold Sponsor');
    element.includesText('Silver Sponsor');
  });
});
