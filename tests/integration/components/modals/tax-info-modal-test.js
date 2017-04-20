import { test } from 'ember-qunit';
import moduleForComponent from '../../../helpers/component-helper';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

const { run } = Ember;

moduleForComponent('modals/tax-info-modal', 'Integration | Component | modals/tax info modal');

test('it renders', function(assert) {

  const store = this.container.lookup('service:store');

  this.set('isOpen', false);
  this.set('taxInfo', run(() => store.createRecord('tax-info')));
  this.set('hasTaxInfo', false);

  this.render(hbs`{{modals/tax-info-modal isOpen=isOpen taxInfo=taxInfo hasTaxInfo=hasTaxInfo}}`);

  assert.ok(this.$().html().trim().includes('Add tax information'));
});
