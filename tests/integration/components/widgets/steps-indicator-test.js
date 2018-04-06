import { find } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | widgets/steps indicator', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', function(assert) {
    this.set('steps', []);
    this.render(hbs`{{widgets/steps-indicator steps=steps currentStep=1 enableAll=false}}`);
    assert.ok(find('*').innerHTML.trim().includes('steps'));
  });
});
