import { test } from 'ember-qunit';
import moduleForComponent from '../../../helpers/component-helper';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('widgets/steps-indicator', 'Integration | Component | widgets/steps indicator');

test('it renders', function(assert) {
  this.set('steps', []);
  this.render(hbs`{{widgets/steps-indicator steps=steps currentStep=1 enableAll=false}}`);
  assert.ok(this.$().html().trim().includes('steps'));
});
