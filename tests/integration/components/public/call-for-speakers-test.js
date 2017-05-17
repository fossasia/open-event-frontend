import { test } from 'ember-qunit';
import moduleForComponent from 'open-event-frontend/tests/helpers/component-helper';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('public/call-for-speakers', 'Integration | Component | public/call for speakers');

test('it renders', function(assert) {
  this.render(hbs`{{public/call-for-speakers}}`);
  assert.ok(this.$().html().trim().includes('Call for Speakers'));
});
