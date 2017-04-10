import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('widgets/forms/rich-text-editor', 'Integration | Component | widgets/forms/rich text editor', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{widgets/forms/rich-text-editor}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#widgets/forms/rich-text-editor}}
      template block text
    {{/widgets/forms/rich-text-editor}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
