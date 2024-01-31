import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | events/view/publish-bar', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders published', async function(assert) {
    this.set('event', { name: 'Test Event', state: 'published', identifier: '23dsds', tickets: [1, 2, 3] });

    await render(hbs`{{events/view/publish-bar event=event}}`);

    assert.dom(this.element).includesText('View Unpublish');
  });

  test('it renders unpublished', async function(assert) {
    this.set('event', { name: 'Test Event', state: 'draft', identifier: '23dsds', tickets: [1, 2, 3] });

    await render(hbs`{{events/view/publish-bar event=event}}`);

    assert.dom(this.element).includesText('Preview Publish');
  });
});
