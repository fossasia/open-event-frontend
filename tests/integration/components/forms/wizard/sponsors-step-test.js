import { test } from 'ember-qunit';
import moduleForComponent from 'open-event-frontend/tests/helpers/component-helper';
import hbs from 'htmlbars-inline-precompile';
import EventWizardMixin from 'open-event-frontend/mixins/event-wizard';
import Ember from 'ember';

const { Object, run } = Ember;

moduleForComponent('forms/wizard/sponsors-step', 'Integration | Component | forms/wizard/sponsors step');

test('it renders', function(assert) {

  const store = this.container.lookup('service:store');

  let EventWizardObject = Object.extend(EventWizardMixin, {
    store
  });

  let eventWizard = EventWizardObject.create();

  this.set('data', {
    sponsors: run(() => eventWizard.getSponsors())
  });
  this.render(hbs`{{forms/wizard/sponsors-step data=data}}`);
  assert.ok(this.$().html().trim().includes('name'));
});
