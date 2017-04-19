import { test } from 'ember-qunit';
import moduleForComponent from '../../helpers/component-helper';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('welcome-header', 'Integration | Component | welcome header');

test('it renders', function(assert) {
  this.render(hbs`{{welcome-header}}`);
  assert.ok(this.$().html().trim().includes('Create Event'));
});
