import { find } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | widgets/forms/image upload', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', function(assert) {
    this.render(hbs`{{widgets/forms/image-upload maxSizeInKb=10000}}`);
    assert.ok(find('*').innerHTML.trim().includes('click or drag-and-drop'));
  });
});
