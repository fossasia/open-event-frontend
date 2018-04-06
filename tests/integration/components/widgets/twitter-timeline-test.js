import { find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';

module('Integration | Component | widgets/twitter timeline', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', function(assert) {
    this.render(hbs`{{widgets/twitter-timeline handleOrProfile='https://twitter.com/fossasia'}}`);
    assert.ok(find('*').innerHTML.trim().includes('@fossasia'), find('*').innerHTML.trim());

    this.render(hbs`{{widgets/twitter-timeline handleOrProfile='https://twitter.com/hashtag/xyzzy'}}`);
    assert.ok(find('*').textContent.trim() === '', find('*').textContent.trim());

    this.render(hbs`{{widgets/twitter-timeline handleOrProfile='holamola'}}`);
    assert.ok(find('*').innerHTML.trim().includes('https://twitter.com/holamola'), find('*').innerHTML.trim());
  });
});
