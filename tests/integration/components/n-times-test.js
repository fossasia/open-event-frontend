import { find } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | n times', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', function(assert) {

    this.render(hbs`
      {{#n-times times=1}}
        test
      {{/n-times}}
    `);

    assert.equal(find('*').textContent.trim(), 'test');
  });
});
