import { test } from 'ember-qunit';
import moduleForComponent from 'open-event-frontend/tests/helpers/component-helper';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('sponsor-item', 'Integration | Component | sponsor item');

const sponsor = [
  { name: 'Sponsor 1', url: '#', logoUrl: 'https://placehold.it/150x60' }
];

test('it renders', function(assert) {
  this.set('sponsor', sponsor);
  this.render(hbs `{{public/sponsor-item sponsor=sponsor}}`);
  assert.ok(this.$().html().trim().includes('img'));
});
