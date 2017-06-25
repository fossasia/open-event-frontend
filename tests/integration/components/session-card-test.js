import { test } from 'ember-qunit';
import moduleForComponent from 'open-event-frontend/tests/helpers/component-helper';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('session-card', 'Integration | Component | session card');

const session = { title: 'Super cool JS', state: 'rejected', event: 'OS Tech', status: 'Rejected', startsAt: new Date(), endsAt: new Date() };
test('it renders', function(assert) {
  this.set('session', session);
  this.render(hbs`{{session-card session=session}}`);
  assert.ok(this.$().html().trim().includes('Rejected'));
});
