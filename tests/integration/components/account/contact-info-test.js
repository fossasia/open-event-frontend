import EmberObject from '@ember/object';
import { module, test } from 'qunit';
import { setupIntegrationTest } from 'open-event-frontend/tests/helpers/setup-integration-test';
import hbs from 'htmlbars-inline-precompile';
import { render } from '@ember/test-helpers';

module('Integration | Component | account/contact info section', function(hooks) {
  setupIntegrationTest(hooks);

  let user = EmberObject.create({
    email   : 'xyz@xyz.com',
    contact : '34893485843'
  });

  test('it renders', async function(assert) {
    this.set('user', user);
    await render(hbs`{{account/contact-info-section user=user l10n=l10n}}`);
    assert.ok(this.element.innerHTML.trim().includes('Email'));
  });
});
