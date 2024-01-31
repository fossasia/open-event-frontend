import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';

module('Integration | Component | tables/utilities/pagination', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    this.setProperties({
      currentPage : 1,
      pageSize    : 10,
      metaData    : {
        count: 100
      }

    });
    await render(hbs`{{tables/utilities/pagination currentPage=currentPage pageSize=pageSize metaData=metaData}}`);
    assert.ok(this.element.innerHTML.trim().includes('Show'));
  });
});
