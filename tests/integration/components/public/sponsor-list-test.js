import { find } from '@ember/test-helpers';
import EmberObject from '@ember/object';
import { A } from '@ember/array';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | sponsor list', function(hooks) {
  setupRenderingTest(hooks);

  const sponsors = A(
    [
      EmberObject.create({
        name        : 'Sponsor 1',
        url         : '#',
        logoUrl     : 'https://placehold.it/150x60',
        level       : 2,
        type        : 'Gold Sponsor',
        description : ''
      }),
      EmberObject.create({
        name        : 'Sponsor 2',
        url         : '#',
        logoUrl     : 'https://placehold.it/150x60',
        level       : 1,
        type        : 'Gold Sponsor',
        description : ''
      }),
      EmberObject.create({
        name        : 'Sponsor 3',
        url         : '#',
        logoUrl     : 'https://placehold.it/150x60',
        level       : 1,
        type        : 'Silver Sponsor',
        description : ''
      })
    ]
  );

  test('it renders', function(assert) {

    this.set('sponsors', sponsors);
    this.render(hbs `{{public/sponsor-list sponsors=sponsors}}`);

    assert.ok(find('*').innerHTML.trim().includes('Sponsors'));
  });
});
