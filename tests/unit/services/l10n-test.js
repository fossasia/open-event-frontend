import { test } from 'ember-qunit';
import moduleFor from 'open-event-frontend/tests/helpers/unit-helper';

moduleFor('service:l10n', 'Unit | Service | l10n', ['service:l10n-ajax']);

// Replace this with your real tests.
test('it exists', function(assert) {
  let service = this.subject();
  assert.ok(service);

  service.setLocale('en');
  assert.equal('en', service.getLocale());

  assert.equal('Submit', service.t('Submit'));

  const testString = 'Register';
  assert.equal(testString, service.tVar(testString));
});
