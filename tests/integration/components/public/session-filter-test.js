import { test } from 'ember-qunit';
import moduleForComponent from 'open-event-frontend/tests/helpers/component-helper';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('public/session-filter', 'Integration | Component | public/session filter');

const tracks = { '1': { name: 'Track 1', id: '1' } };

test('it renders', function(assert) {
  this.set('tracks', tracks);
  this.render(hbs `{{public/session-filter tracks=tracks}}`);
  assert.ok(this.$().html().trim().includes('Track'));
});
