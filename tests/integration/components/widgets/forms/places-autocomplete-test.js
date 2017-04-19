import { test } from 'ember-qunit';
import moduleForComponent from '../../../../helpers/component-helper';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('widgets/forms/places-autocomplete', 'Integration | Component | widgets/forms/places autocomplete');

test('it renders', function(assert) {
  this.on('placeChanged', function() { });
  this.render(hbs`{{widgets/forms/places-autocomplete placeChangedCallback=(action 'placeChanged')}}`);
  assert.ok(this.$().html().trim().includes('place-autocomplete--input'));
});
