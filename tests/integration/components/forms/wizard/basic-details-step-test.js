import { test } from 'ember-qunit';
import moduleForComponent from 'open-event-frontend/tests/helpers/component-helper';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

const { run } = Ember;

moduleForComponent('forms/wizard/basic-details-step', 'Integration | Component | forms/wizard/basic details step');

test('it renders', function(assert) {

  const store = this.container.lookup('service:store');

  this.set('data', {
    event: run(() => store.createRecord('event'))
  });
  this.render(hbs`{{forms/wizard/basic-details-step data=data isCreate=true}}`);
  assert.ok(this.$().html().trim().includes('location'));
});
