import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Service | loader', function(hooks) {
  setupTest(hooks);


  test('it exists and works', async function(assert) {
    const service = this.owner.lookup('service:loader');
    assert.ok(service);

    let response;
    response = await service.get('http://httpbin.org/get?test=string&foo=bar', { isExternal: true });
    assert.deepEqual(response.args, { test: 'string', foo: 'bar' }, `Received response: ${JSON.stringify(response)}`);

    const testPayload = {
      foo  : 'bar',
      test : 'payload'
    };

    response = await service.post('http://httpbin.org/post', testPayload, { isExternal: true });
    assert.deepEqual(response.json, testPayload, `Received response: ${JSON.stringify(response)}`);

    response = await service.put('http://httpbin.org/put', testPayload, { isExternal: true });
    assert.deepEqual(response.json, testPayload, `Received response: ${JSON.stringify(response)}`);

    await service.delete('http://httpbin.org/delete', { isExternal: true });
  });
});

