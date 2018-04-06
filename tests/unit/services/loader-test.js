import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Service | loader', function(hooks) {
  setupTest(hooks);


  test('it exists and works', function(assert) {
    let service = this.owner.lookup('service:loader');
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
});
