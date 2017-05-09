import { test } from 'ember-qunit';
import moduleForComponent from 'open-event-frontend/tests/helpers/component-helper';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('public/featured-speaker-list', 'Integration | Component | public/featured speaker list');

const speaker = [
  { name: 'Speaker 3', organisation: 'FOSSASIA', isFeatured: true, socialLinks: [{ name: 'linkedin', url: '#' }], short_biography: 'Full-stack developer with experience in PHP, Python &amp; Ember.JS. Plays around with Kubernetes and Containers. Avid open source contributor.' }
];

test('it renders', function(assert) {

  this.set('speaker', speaker);
  this.render(hbs `{{public/featured-speaker-list speaker=speaker}}`);
  assert.ok(this.$().html().trim().includes('Featured Speakers'));
});
