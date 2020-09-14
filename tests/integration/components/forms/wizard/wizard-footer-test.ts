import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

/* eslint-disable */
module('Integration | Component | forms/wizard/wizard-footer', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders published', async function(assert) {
    this.set('event', { name: 'Test Event', state: 'published', identifier: '23dsds', tickets: [1, 2, 3] });
    this.set('dummy', () => {});

    await render(hbs`{{forms/wizard/wizard-footer event=event onSaved=dummy onSaveDraft=dummy move=dummy}}`);

    assert.dom(this.element).includesText('This event is published');
  });

  test('it renders unpublished', async function(assert) {
    this.set('event', { name: 'Test Event', state: 'draft', identifier: '23dsds', tickets: [1, 2, 3] });
    this.set('dummy', () => {});

    await render(hbs`{{forms/wizard/wizard-footer event=event onSaved=dummy onSaveDraft=dummy move=dummy}}`);

    assert.dom(this.element).includesText('This event is currently not published');
  });

  test('it renders unsaved', async function(assert) {
    this.set('event', { name: 'Test Event', state: 'draft', tickets: [1, 2, 3] });
    this.set('dummy', () => {});

    await render(hbs`{{forms/wizard/wizard-footer event=event onSaved=dummy onSaveDraft=dummy move=dummy}}`);

    assert.dom(this.element).includesText('You can preview the event after you have saved it as a draft');
  });
});
