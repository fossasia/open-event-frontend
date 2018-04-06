import { find } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | events/view/export/download common', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', function(assert) {
    this.render(hbs`{{events/view/export/download-common l10n=l10n}}`);
    assert.ok(find('*').innerHTML.trim().includes('Download Event'));
  });
});
