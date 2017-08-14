import { test } from 'ember-qunit';
import moduleFor from 'open-event-frontend/tests/helpers/unit-helper';

moduleFor('service:loader', 'Unit | Service | loader', ['adapter:application']);

// Replace this with your real tests.
test('it exists and works', function(assert) {
  let service = this.subject();
  assert.ok(service);

  const getDone = assert.async();
  service.load('https://httpbin.org/get?test=string&foo=bar', { isExternal: true }).then(response => {
    assert.deepEqual(response.args, { test: 'string', foo: 'bar' }, response);
  }).finally(() => {
    getDone();
  });

  const testPayload = {
    foo  : 'bar',
    test : 'payload'
  };

  const postDone = assert.async();
  service.post('https://httpbin.org/post', testPayload, { isExternal: true }).then(response => {
    assert.deepEqual(JSON.parse(response.data), testPayload, response);
    assert.deepEqual(response.json, testPayload, response);
  }).finally(() => {
    postDone();
  });

  const putDone = assert.async();
  service.put('https://httpbin.org/put', testPayload, { isExternal: true }).then(response => {
    assert.deepEqual(JSON.parse(response.data), testPayload, response);
    assert.deepEqual(response.json, testPayload, response);
  }).finally(() => {
    putDone();
  });

  const deleteDone = assert.async();
  service.delete('https://httpbin.org/delete', { isExternal: true }).then(() => {
    assert.ok(true);
  }).finally(() => {
    deleteDone();
  });

});
