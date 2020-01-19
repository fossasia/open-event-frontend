import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Service | confirm', function(hooks) {
  setupTest(hooks);


  test('it exists', function(assert) {
    let service = this.owner.lookup('service:confirm');
    assert.ok(service);

    const promptText = 'Are you sure you want to work properly ?';
    const promise = service.prompt(promptText);
    assert.ok(promise !== null);
    assert.equal(promptText, service.get('promptText'));
  });
});
