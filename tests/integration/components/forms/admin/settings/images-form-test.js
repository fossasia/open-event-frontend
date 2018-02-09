import { test } from 'ember-qunit';
import moduleForComponent from 'open-event-frontend/tests/helpers/component-helper';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('forms/admin/settings/images-form', 'Integration | Component | forms/admin/settings/images form');

const images = [{ type: 'event', logoWidth: 10 }];

test('it renders', function(assert) {
  this.set('images', images);
  this.render(hbs`{{forms/admin/settings/images-form images=images}}`);
  assert.ok(this.$().html().trim().includes('Event Images'));
});
