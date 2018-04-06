import { find } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | forms/admin/settings/images form', function(hooks) {
  setupRenderingTest(hooks);

  const images = [{ type: 'event', logoWidth: 10 }];

  test('it renders', function(assert) {
    this.set('images', images);
    this.render(hbs`{{forms/admin/settings/images-form images=images}}`);
    assert.ok(find('*').innerHTML.trim().includes('Event Images'));
  });
});
