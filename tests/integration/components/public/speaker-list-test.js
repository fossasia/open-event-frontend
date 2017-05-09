import { test } from 'ember-qunit';
import moduleForComponent from 'open-event-frontend/tests/helpers/component-helper';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('public/speaker-list', 'Integration | Component | public/speaker list');

const speakers = [
  { name: 'Speaker 3', organisation: 'FOSSASIA', socialLinks: [{ name: 'linkedin', url: '#' }] },
  { name: 'Speaker 4', organisation: 'FOSSASIA', socialLinks: [{ name: 'twitter', url: '#' }] }
];

test('it renders', function(assert) {

  this.set('speakers', speakers);
  this.render(hbs `{{public/speaker-list speakers=speakers}}`);

  assert.ok(this.$().html().trim().includes('FOSSASIA'));
});
