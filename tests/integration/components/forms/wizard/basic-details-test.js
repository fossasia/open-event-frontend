import { test } from 'ember-qunit';
import moduleForComponent from '../../../../helpers/component-helper';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('forms/wizard/basic-details', 'Integration | Component | forms/wizard/basic details');

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });
  this.set('data', {
    event: {}
  });
  this.render(hbs`{{forms/wizard/basic-details data=data}}`);
  assert.ok(this.$().html().trim().includes('Create'));
});
