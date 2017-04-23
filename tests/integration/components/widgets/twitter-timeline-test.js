import { test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import moduleForComponent from 'open-event-frontend/tests/helpers/component-helper';

moduleForComponent('widgets/twitter-timeline', 'Integration | Component | widgets/twitter timeline');

test('it renders', function(assert) {
  this.render(hbs`{{widgets/twitter-timeline handleOrProfile='https://twitter.com/fossasia'}}`);
  assert.ok(this.$().html().trim().includes('@fossasia'), this.$().html().trim());

  this.render(hbs`{{widgets/twitter-timeline handleOrProfile='https://twitter.com/hashtag/xyzzy'}}`);
  assert.ok(this.$().text().trim() === '', this.$().text().trim());

  this.render(hbs`{{widgets/twitter-timeline handleOrProfile='holamola'}}`);
  assert.ok(this.$().html().trim().includes('https://twitter.com/holamola'), this.$().html().trim());
});
