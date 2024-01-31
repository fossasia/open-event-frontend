import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | widgets/forms/link-field', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    let link = null;
    this.set('prefix', null);
    this.set('value', null);
    this.set('onChange', (val: string) => { link = val });

    await render(hbs`{{widgets/forms/link-field prefix=prefix value=value onChange=onChange}}`);

    assert.equal(this.element.textContent?.trim(), 'https://');

    this.set('prefix', 'https://twitter.com/');

    assert.equal(this.element.textContent?.trim(), 'https://twitter.com/');
    assert.equal(link, null);
  });

  test('it renders on prefix switch', async function(assert) {
    let link = null;
    this.set('prefix', 'https://twitter.com/');
    this.set('value', 'https://twitter.com/phamil');
    this.set('onChange', (val: string) => { link = val });

    await render(hbs`{{widgets/forms/link-field prefix=prefix value=value onChange=onChange}}`);

    this.set('prefix', 'https://github.com/');

    assert.equal(link, 'https://github.com/phamil');
  })
});
