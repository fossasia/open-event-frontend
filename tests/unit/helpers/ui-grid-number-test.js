
import { uiGridNumber } from 'open-event-frontend/helpers/ui-grid-number';
import { module, test } from 'qunit';

module('Unit | Helper | ui grid number');

test('it works', function(assert) {
  let result = uiGridNumber([1]);
  assert.equal(result, 'one');
});

