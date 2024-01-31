import { getProperties } from 'open-event-frontend/helpers/get-properties';
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Helper | get-properties', function(hooks) {
  setupTest(hooks);

  test('it works', function(assert) {
    const sourceObject = { itemOne: 'universe', itemTwo: 'sun', itemThree: 'earth' };
    assert.deepEqual(
      getProperties([sourceObject, 'itemOne', 'itemTwo']),
      { itemOne: 'universe', itemTwo: 'sun' }
    );

    assert.deepEqual(
      getProperties([sourceObject, 'itemOne']),
      { itemOne: 'universe' }
    );

    assert.deepEqual(
      getProperties([sourceObject, ['itemOne', 'itemTwo']]),
      { itemOne: 'universe', itemTwo: 'sun' }
    );

    assert.deepEqual(
      getProperties([sourceObject, Object.keys(sourceObject)]),
      sourceObject
    );

    assert.deepEqual(
      getProperties([sourceObject, ...Object.keys(sourceObject)]),
      sourceObject
    );
  });
});
