import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupIntegrationTest } from 'open-event-frontend/tests/helpers/setup-integration-test';
import { render } from '@ember/test-helpers';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
dayjs.extend(utc);
dayjs.extend(timezone);

module('Integration | Helper | header date', function(hooks) {
  setupIntegrationTest(hooks);

  test('it renders', async function(assert) {
    this.set('inputMomentValue', dayjs('2019-05-01T03:30:00+09:00'));
    this.set('inputTimezoneValue', 'Japan');
    await render(hbs`{{header-date inputMomentValue inputTimezoneValue}}`);
    assert.equal(this.element.innerHTML.trim(), 'Wednesday, May 1st 2019, 3:30 AM (JST)');
  });
});
