import { test } from 'ember-qunit';
import moduleForComponent from 'open-event-frontend/tests/helpers/component-helper';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('sponsor-list', 'Integration | Component | sponsor list');

const sponsors = [{ name: 'Sponsor 2', url: '#', logoUrl: 'http://placehold.it/150x60', level: 2, type: 'Gold Sponsor', description: '' },
  { name: 'Sponsor 1', url: '#', logoUrl: 'http://placehold.it/150x60', level: 1, type: 'Gold Sponsor', description: '' },
  { name: 'Sponsor 3', url: '#', logoUrl: 'http://placehold.it/150x60', level: 1, type: 'Silver Sponsor', description: '' }
];

test('it renders', function(assert) {

  this.set('sponsors', sponsors);
  this.render(hbs `{{public/sponsor-list sponsors=sponsors}}`);

  assert.ok(this.$().html().trim().includes('Sponsors'));
});
