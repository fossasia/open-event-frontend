import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('modals/tax-info-modal', 'Integration | Component | modals/tax info modal', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{modals/tax-info-modal}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#modals/tax-info-modal}}
      template block text
    {{/modals/tax-info-modal}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
