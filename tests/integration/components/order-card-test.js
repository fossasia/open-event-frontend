import { hbs } from 'ember-cli-htmlbars';
import EmberObject from '@ember/object';
import { module, test } from 'qunit';
import { A } from '@ember/array';
import { setupIntegrationTest } from 'open-event-frontend/tests/helpers/setup-integration-test';
import { render } from '@ember/test-helpers';

module('Integration | Component | order card', function(hooks) {
  setupIntegrationTest(hooks);

  const event = EmberObject.create({ originalImageUrl: 'abc.png', name: 'Pragma', startsAt: new Date(), shortLocationName: 'IN', paymentCurrency: 'INR' });
  const ticket = EmberObject.create({ name: 'community', type: 'Free' });
  const attendees = A(
    [
      EmberObject.create({
        email       : 'test@gmail.com',
        isCheckedIn : false,
        ticket
      })
    ]
  );
  const order = EmberObject.create({ identifier: 123, amount: 1000, event, attendees, completedAt: new Date() });
  const currentUser = EmberObject.create({ email: 'test1@gmail.com' });
  const authManager = EmberObject.create({ currentUser });

  test('it renders', async function(assert) {
    this.set('order', order);
    this.set('authManager', authManager);
    await render(hbs`{{order-card order=order authManager=authManager}}`);
    assert.dom(this.element).includesText('Pragma');
  });
});
