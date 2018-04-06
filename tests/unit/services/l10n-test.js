import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Service | l10n', function(hooks) {
  setupTest(hooks);


  test('it exists', function(assert) {
    let service = this.owner.lookup('service:l10n');
    assert.ok(service);

    service.setLocale('en');
    assert.equal('en', service.getLocale());

    assert.equal('Submit', service.t('Submit'));

    const testString = 'Register';
    assert.equal(testString, service.tVar(testString));
  });
});
