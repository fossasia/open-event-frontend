import EmberObject from '@ember/object';
import { A } from '@ember/array';
import { module, test } from 'qunit';
import { setupIntegrationTest } from 'open-event-frontend/tests/helpers/setup-integration-test';
import hbs from 'htmlbars-inline-precompile';
import { render } from '@ember/test-helpers';

const data = EmberObject.create({
  parentData: EmberObject.create({
    event: EmberObject.create({
      isSponsorsEnabled: false
    })
  }),
  sponsors: A([EmberObject.create({
    name: 'TEST'
  })])
});

module('Integration | Component | forms/wizard/sponsors step', function(hooks) {
  setupIntegrationTest(hooks);

  test('it renders', async function(assert) {
    this.set('data', data);
    await render(hbs`{{forms/wizard/sponsors-step data=data}}`);
    assert.ok(this.element.innerHTML.trim().includes('Sponsors'));
  });
});
