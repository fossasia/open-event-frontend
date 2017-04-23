import { test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import moduleForComponent from 'open-event-frontend/tests/helpers/component-helper';

moduleForComponent('public/social-links', 'Integration | Component | public/social links');

test('it renders', function(assert) {
  this.set('eventUrl', 'https://example.com');
  this.render(hbs`{{public/social-links eventUrl=eventUrl}}`);
  assert.ok(this.$().html().trim().includes('https://example.com'));
});
