import { test } from 'ember-qunit';
import moduleForComponent from '../../../helpers/component-helper';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('modals/tax-info-modal', 'Integration | Component | modals/tax info modal');

test('it renders', function(assert) {

  this.set('isOpen', true);
  this.set('taxInfo', {});
  this.set('hasTaxInfo', false);

  this.render(hbs`{{modals/tax-info-modal isOpen=isOpen taxInfo=taxInfo hasTaxInfo=hasTaxInfo}}`);

  assert.ok(this.$().html().trim().includes('Add tax information'));
});
