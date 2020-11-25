import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

function assertContains(assert: any, text: string | undefined, item: string) {
  assert.ok(text?.indexOf(item) !== -1, `Item not found in text\nActual: >\n${text}\n\nExpected: >\n${item}\n`);
}

module('Integration | Component | widgets/forms/social-link-field', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    await render(hbs`{{widgets/forms/social-link-field}}`);

    const content = this.element.textContent?.trim();
    assertContains(assert, content, 'Website');
    assertContains(assert, content, 'Twitter');
    assertContains(assert, content, 'Google Groups');
    assertContains(assert, content, 'https://');
  });
});
