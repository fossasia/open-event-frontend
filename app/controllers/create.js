import Ember from 'ember';
import EventWizardMixin from 'open-event-frontend/mixins/event-wizard';

const { Controller } = Ember;

export default Controller.extend(EventWizardMixin, {

  data: {},

  init() {
    this._super.call(this);
    this.set('data.event', this.getBasicDetails());
    this.set('steps', this.getSteps());
  }
});
