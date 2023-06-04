import { click, fillIn, find, render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { setupRenderingTest } from 'ember-qunit';
import { module, test } from 'qunit';

module('Integration | Component | expandable-search-box', function(hooks) {
  setupRenderingTest(hooks);

  test('it expands and collapses on search icon click', async function(assert) {
    await render(hbs`<ExpandableSearchBox />`);

    const containerElement = find('.ui.input');
    const inputElement = find('input');

    assert.notOk(containerElement.classList.contains('expanded'), 'Input field is initially collapsed');

    await click(inputElement);

    assert.ok(
      containerElement.classList.contains('expanded')
      , 'Input field is expanded after click');

    await click('body');

    assert.notOk(containerElement.classList.contains('expanded'), 'Input field is collapsed after out focus');
  });

  test('it updates the search query', async function(assert) {
    await render(hbs`<ExpandableSearchBox @searchQuery={{this.searchQuery}} />`);

    const inputElement = find('input');
    const searchQuery = 'example search query';

    await click('.search.icon');
    await fillIn(inputElement, searchQuery);

    assert.equal(this.searchQuery, searchQuery, 'Search query is updated');
  });
});
