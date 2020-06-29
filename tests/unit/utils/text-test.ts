import { slugify } from 'open-event-frontend/utils/text';
import { module, test } from 'qunit';

module('Unit | Text | Slugify', function() {
  test('test slugify', function(assert) {
    assert.equal(slugify('Hello World'), 'hello-world');
    assert.equal(slugify('Name and Age', '_'), 'name_and_age');
    assert.equal(slugify('What is Suo Moto?'), 'what-is-suo-moto');
  });
});
