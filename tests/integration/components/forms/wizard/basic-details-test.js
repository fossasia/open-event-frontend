import { test } from 'ember-qunit';
import moduleForComponent from '../../../../helpers/component-helper';
import hbs from 'htmlbars-inline-precompile';
import EventWizardMixin from 'open-event-frontend/mixins/event-wizard';
import Ember from 'ember';

const { Object, run } = Ember;

moduleForComponent('forms/wizard/basic-details', 'Integration | Component | forms/wizard/basic details');

test('it renders', function(assert) {

  const store = this.container.lookup('service:store');

  let EventWizardObject = Object.extend(EventWizardMixin, {
    store
  });

  let eventWizard = EventWizardObject.create();

  this.set('data', {
    event: run(() => eventWizard.getBasicDetails())
  });
  this.render(hbs`{{forms/wizard/basic-details data=data}}`);
  assert.ok(this.$().html().trim().includes('location'));
});
