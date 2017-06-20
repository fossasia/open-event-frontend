import { test } from 'ember-qunit';
import moduleForComponent from 'open-event-frontend/tests/helpers/component-helper';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('n-times', 'Integration | Component | n times');

test('it renders', function(assert) {

  this.render(hbs`
    {{#n-times times=1}}
      test
    {{/n-times}}
  `);

  assert.equal(this.$().text().trim(), 'test');
});
