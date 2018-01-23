import { test } from 'ember-qunit';
import Ember from 'ember';
import moduleForComponent from 'open-event-frontend/tests/helpers/component-helper';
import hbs from 'htmlbars-inline-precompile';

const { Object: EmberObject, A } = Ember;

moduleForComponent('sponsor-list', 'Integration | Component | sponsor list');

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

  assert.ok(this.$().html().trim().includes('Sponsors'));
});
