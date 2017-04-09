import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('forms/cropper/background-cropper', 'Integration | Component | forms/cropper/background cropper', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{forms/cropper/background-cropper}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#forms/cropper/background-cropper}}
      template block text
    {{/forms/cropper/background-cropper}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
