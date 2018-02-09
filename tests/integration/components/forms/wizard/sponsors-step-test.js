import { test } from 'ember-qunit';
import moduleForComponent from 'open-event-frontend/tests/helpers/component-helper';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

const { Object: EmberObject, A } = Ember;

const data = EmberObject.create({
  parentData: EmberObject.create({
    event: EmberObject.create({
      isSponsorsEnabled: false
    })
  }),
  sponsors: A([EmberObject.create({
    name: 'TEST'
  })])
});

moduleForComponent('forms/wizard/sponsors-step', 'Integration | Component | forms/wizard/sponsors step');

test('it renders', function(assert) {
  this.set('data', data);
  this.render(hbs`{{forms/wizard/sponsors-step data=data}}`);
  assert.ok(this.$().html().trim().includes('Sponsors'));
});
