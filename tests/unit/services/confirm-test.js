import { moduleFor, test } from 'ember-qunit';

moduleFor('service:confirm', 'Unit | Service | confirm', {

});

// Replace this with your real tests.
test('it exists', function(assert) {
  let service = this.subject();
  assert.ok(service);

  const promptText = 'Are you sure you want to work properly ?';
  const promise = service.prompt(promptText);
  assert.ok(promise !== null);
  assert.equal(promptText, service.get('promptText'));
});
