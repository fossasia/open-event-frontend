import { test } from 'ember-qunit';
import moduleForComponent from 'open-event-frontend/tests/helpers/component-helper';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('public/speaker-item', 'Integration | Component | public/speaker item');

const speaker = { name: 'USER 1', organisation: 'FOSSASIA', socialLinks: [{ name: 'facebook', url: '#' }] };

test('it renders', function(assert) {

  this.set('speaker', speaker);
  this.render(hbs `{{public/speaker-item speaker=speaker}}`);

  assert.ok(this.$().html().trim().includes('FOSSASIA'));
});
