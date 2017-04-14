import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('modals/confirm-modal', 'Integration | Component | modals/confirm modal', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{modals/confirm-modal}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#modals/confirm-modal}}
      template block text
    {{/modals/confirm-modal}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
