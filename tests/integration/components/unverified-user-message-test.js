import { module, test } from 'qunit';
import EmberObject from '@ember/object';
import { setupIntegrationTest } from 'open-event-frontend/tests/helpers/setup-integration-test';
import hbs from 'htmlbars-inline-precompile';
import { render } from '@ember/test-helpers';

module('Integration | Component | unverified user message', function(hooks) {
  setupIntegrationTest(hooks);

  test('it renders', async function(assert) {
    this.set('shouldShowMessage', true);
    this.set('isMailSent', true);
    await render(hbs`{{unverified-user-message shouldShowMessage=shouldShowMessage isMailSent=isMailSent}}`);
    assert.ok(this.element.innerHTML.trim().includes('Confirmation mail has been sent again successfully'));
  });

  test('it renders', async function(assert) {

    let session = EmberObject.create({
      currentRouteName: 'events.view.index'
    });

    this.set('shouldShowMessage', true);
    this.set('isMailSent', false);
    this.set('session', session);
    await render(hbs`{{unverified-user-message shouldShowMessage=shouldShowMessage session=session isMailSent=isMailSent}}`);
    assert.ok(this.element.innerHTML.trim().includes('To make your event live, please verify your account by clicking on the confirmation link that has been emailed to you.'));
  });

  test('it renders', async function(assert) {

    let session = EmberObject.create({
      currentRouteName: 'else'
    });

    this.set('shouldShowMessage', true);
    this.set('isMailSent', false);
    this.set('session', session);
    await render(hbs`{{unverified-user-message shouldShowMessage=shouldShowMessage session=session isMailSent=isMailSent}}`);
    assert.ok(this.element.innerHTML.trim().includes('Your account is unverified. Please verify by clicking on the confirmation link that has been emailed to you.'));
  });
});
