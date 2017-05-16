import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('public/event-map', 'Integration | Component | public/event map', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(1);

  this.render(hbs`{{public/event-map event=model.event}}`);
  assert.ok(this.$());

});

test('it includes the marker', function(assert) {
  assert.expect(1);

  this.render(hbs`
    {{#g-map as |context|}}
      {{g-map-marker context}}
    {{/g-map}}
  `);

  assert.equal(this.get('markers.length', 1));
});
