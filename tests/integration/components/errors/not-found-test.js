import { test } from 'ember-qunit';
import moduleForComponent from '../../../helpers/component-helper';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('errors/not-found', 'Integration | Component | errors/not found');

test('it renders', function(assert) {
  this.render(hbs`{{errors/not-found}}`);
  assert.ok(this.$().html().trim().includes('404'));
});
