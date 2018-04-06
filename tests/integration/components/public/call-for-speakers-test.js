import { find } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | public/call for speakers', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', function(assert) {
    this.render(hbs`{{public/call-for-speakers}}`);
    assert.ok(find('*').innerHTML.trim().includes('Call for Speakers'));
  });
});
