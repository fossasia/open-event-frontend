import { hbs } from 'ember-cli-htmlbars';
import EmberObject from '@ember/object';
import { module, test } from 'qunit';
import { setupIntegrationTest } from 'open-event-frontend/tests/helpers/setup-integration-test';
import { render } from '@ember/test-helpers';

module('Integration | Component | public/copyright item', function(hooks) {
  setupIntegrationTest(hooks);

  const copyright = EmberObject.create({
    holder     : 'Creative Commons',
    holderUrl  : 'https://creativecommons.org',
    licence    : 'Public Domain Dedication (CC0)',
    licenceUrl : 'https://creativecommons.org/publicdomain/zero/1.0/',
    year       : 2007,
    logoUrl    : 'https://image.ibb.co/gt7q7v/pdd.png'
  });

  test('it renders', async function(assert) {
    this.set('copyright', copyright);
    await render(hbs`{{public/copyright-item copyright=copyright}}`);
    assert.ok(this.element.innerHTML.trim().includes('Public Domain Dedication (CC0)'));
  });
});
