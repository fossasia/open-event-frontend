import { find } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | public/session filter', function(hooks) {
  setupRenderingTest(hooks);

  const tracks = { '1': { name: 'Track 1', id: '1' } };

  test('it renders', function(assert) {
    this.set('tracks', tracks);
    this.render(hbs `{{public/session-filter tracks=tracks}}`);
    assert.ok(find('*').innerHTML.trim().includes('Track'));
  });
});
