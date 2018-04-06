import { find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';

module('Integration | Component | public/social links', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', function(assert) {
    this.set('eventUrl', 'https://example.com');
    this.render(hbs`{{public/social-links eventUrl=eventUrl}}`);
    assert.ok(find('*').innerHTML.trim().includes('https://example.com'));
  });
});
