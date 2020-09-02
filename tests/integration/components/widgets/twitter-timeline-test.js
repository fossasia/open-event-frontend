import { hbs } from 'ember-cli-htmlbars';
import { render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupIntegrationTest } from 'open-event-frontend/tests/helpers/setup-integration-test';

module('Integration | Component | widgets/twitter timeline', function(hooks) {
  setupIntegrationTest(hooks);

  test('it renders', async function(assert) {
    await render(hbs`{{widgets/twitter-timeline handleOrProfile='https://twitter.com/fossasia'}}`);
    assert.ok(this.element.innerHTML.trim().includes('@fossasia'), this.element.innerHTML.trim());

    await render(hbs`{{widgets/twitter-timeline handleOrProfile='https://twitter.com/hashtag/xyzzy'}}`);
    assert.ok(this.element.textContent.trim() === '', this.element.textContent.trim());

    await render(hbs`{{widgets/twitter-timeline handleOrProfile='holamola'}}`);
    assert.ok(this.element.innerHTML.trim().includes('https://twitter.com/holamola'), this.element.innerHTML.trim());
  });
});
