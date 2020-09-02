import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';

module('Integration | Helper | is-input-field', function(hooks) {
  setupRenderingTest(hooks);

  test('it returns true for field type text', async function(assert) {
    this.set('fieldType', 'text');
    await render(hbs`{{if (is-input-field fieldType) 'yes the field type is text' 'no the field type is not text'}}`);
    assert.equal(this.element.textContent.trim(), 'yes the field type is text');
  });

  test('it returns true for field type email', async function(assert) {
    this.set('fieldType', 'email');
    await render(hbs`{{if (is-input-field fieldType) 'yes the field type is email' 'no the field type is not email'}}`);
    assert.equal(this.element.textContent.trim(), 'yes the field type is email');
  });

  test('it returns true for field type number', async function(assert) {
    this.set('fieldType', 'number');
    await render(hbs`{{if (is-input-field fieldType) 'yes the field type is number' 'no the field type is not number'}}`);
    assert.equal(this.element.textContent.trim(), 'yes the field type is number');
  });

  test('it returns false for field type other than text, email and number', async function(assert) {
    this.set('fieldType', 'abc');
    await render(hbs`{{if (is-input-field fieldType) 'yes the field type is either text, email or number' 'no the field type is not text, email or number'}}`);
    assert.equal(this.element.textContent.trim(), 'no the field type is not text, email or number');
  });

});
