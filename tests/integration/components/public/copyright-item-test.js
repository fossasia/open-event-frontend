import { test } from 'ember-qunit';
import moduleForComponent from 'open-event-frontend/tests/helpers/component-helper';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('public/copyright-item', 'Integration | Component | public/copyright item');

test('it renders', function(assert) {
  this.render(hbs`{{public/copyright-item licenseName='Attribution-NonCommercial-NoDerivs'}}`);
  assert.ok(this.$().html().trim().includes('https://creativecommons.org/licenses/by-nc-nd/4.0'));
});
