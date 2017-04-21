import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import EventWizardMixin from 'open-event-frontend/mixins/event-wizard';

const { Route } = Ember;

export default Route.extend(AuthenticatedRouteMixin, EventWizardMixin, {
  titleToken() {
    return this.i18n.t('Create an Event');
  },
  model() {
    return {
      data  : { event: this.getBasicDetails() },
      steps : this.getSteps()
    };
  }
});
