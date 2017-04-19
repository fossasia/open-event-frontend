import Ember from 'ember';
import EventWizardMixin from 'open-event-frontend/mixins/event-wizard';

const { Controller, on } = Ember;

export default Controller.extend(EventWizardMixin, {

  data: {},

  _init: on('init', function() {
    this.set('data.event', this.getBasicDetails());
    this.set('steps', this.getSteps());
  })
});
