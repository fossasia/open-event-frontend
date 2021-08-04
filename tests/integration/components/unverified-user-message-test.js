import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupIntegrationTest } from 'open-event-frontend/tests/helpers/setup-integration-test';
import { render } from '@ember/test-helpers';

module('Integration | Component | unverified user message', function(hooks) {
  setupIntegrationTest(hooks);

  function setShouldShowMessage(sessionExtra = {}) {
    this.set('session', {
      isAuthenticated: true,
      ...sessionExtra
    });
    this.set('authManager', {
      currentUser: {
        isVerified: false
      }
    });
  }

  test('confirmation mail sent', async function(assert) {
    setShouldShowMessage.call(this);
    this.set('isMailSent', true);
    await render(hbs`{{unverified-user-message isMailSent=isMailSent authManager=authManager session=session}}`);
    assert.dom(this.element).includesText('Confirmation mail has been sent again successfully');
  });

  test('event live message', async function(assert) {
    setShouldShowMessage.call(this, {
      currentRouteName: 'events.view.index'
    });
    this.set('isMailSent', false);
    await render(hbs`{{unverified-user-message session=session authManager=authManager isMailSent=isMailSent}}`);
    assert.dom(this.element).includesText('To make your event live, please verify your account by clicking on the confirmation link that has been emailed to you.');
  });

  test('unverified message', async function(assert) {
    setShouldShowMessage.call(this, {
      currentRouteName: 'else'
    });
    this.set('isMailSent', false);
    await render(hbs`{{unverified-user-message session=session authManager=authManager isMailSent=isMailSent}}`);
    assert.dom(this.element).includesText('Your account functionality is limited. To get full access to all features you need to verify your email by clicking on the confirmation link that has been emailed to you.');
  });
});
