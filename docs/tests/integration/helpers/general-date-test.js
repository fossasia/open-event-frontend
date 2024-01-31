import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupIntegrationTest } from 'open-event-frontend/tests/helpers/setup-integration-test';
import { render } from '@ember/test-helpers';
import moment from 'moment-timezone';

module('Integration | Helper | general date', function(hooks) {
  setupIntegrationTest(hooks);

  test('it renders', async function(assert) {
    this.set('inputMomentValue', moment('2019-05-01T03:30:00+09:00'));
    this.set('inputTimezoneValue', 'Japan');
    await render(hbs`{{general-date inputMomentValue tz=inputTimezoneValue}}`);
    assert.equal(this.element.innerHTML.trim(), '3:30 AM, May 1st 2019 (JST)');

    this.set('inputTimezoneValue', 'Asia/Singapore');
    await render(hbs`{{general-date inputMomentValue tz=inputTimezoneValue}}`);
    assert.equal(this.element.innerHTML.trim(), '2:30 AM, May 1st 2019 (SGT)');
  });
});
