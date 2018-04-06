import { find } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | sponsor item', function(hooks) {
  setupRenderingTest(hooks);

  const sponsor = [
    { name: 'Sponsor 1', url: '#', logoUrl: 'https://placehold.it/150x60' }
  ];

  test('it renders', function(assert) {
    this.set('sponsor', sponsor);
    this.render(hbs `{{public/sponsor-item sponsor=sponsor}}`);
    assert.ok(find('*').innerHTML.trim().includes('img'));
  });
});
