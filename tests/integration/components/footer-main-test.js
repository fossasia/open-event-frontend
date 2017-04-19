import { test } from 'ember-qunit';
import moduleForComponent from '../../helpers/component-helper';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('footer-main', 'Integration | Component | footer main');

test('it renders', function(assert) {
  this.render(hbs`{{footer-main}}`);
  assert.ok(this.$().html().trim().includes('footer'));
});
