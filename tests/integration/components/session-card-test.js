import { find } from '@ember/test-helpers';
import EmberObject from '@ember/object';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | session card', function(hooks) {
  setupRenderingTest(hooks);

  const session = EmberObject.create({ title: 'Super cool JS', state: 'rejected', event: 'OS Tech', startsAt: new Date(), endsAt: new Date() });
  test('it renders', function(assert) {
    this.set('session', session);
    this.render(hbs`{{session-card session=session}}`);
    assert.ok(find('*').innerHTML.trim().includes('rejected'));
  });
});
