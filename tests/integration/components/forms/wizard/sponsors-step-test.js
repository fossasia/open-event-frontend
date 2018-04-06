import { find } from '@ember/test-helpers';
import EmberObject from '@ember/object';
import { A } from '@ember/array';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

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
  setupRenderingTest(hooks);

  test('it renders', function(assert) {
    this.set('data', data);
    this.render(hbs`{{forms/wizard/sponsors-step data=data}}`);
    assert.ok(find('*').innerHTML.trim().includes('Sponsors'));
  });
});
