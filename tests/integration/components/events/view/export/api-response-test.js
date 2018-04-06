import { find } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | events/view/export/api response', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', function(assert) {
    this.render(hbs`{{events/view/export/api-response l10n=l10n}}`);
    assert.ok(find('*').innerHTML.trim().includes('Access event information'));
  });
});
