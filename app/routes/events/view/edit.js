import Ember from 'ember';
import EventWizardMixin from 'open-event-frontend/mixins/event-wizard';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const { Route } = Ember;

export default Route.extend(AuthenticatedRouteMixin, EventWizardMixin, {
  titleToken() {
    return this.i18n.t('Edit Event');
  },

  beforeModel(transition) {
    this._super(...arguments);
    if (transition.targetName === 'events.view.edit.index') {
      this.transitionTo('events.view.edit.basic-details');
    }
  },

  model() {
    return {
      event : this._super(...arguments),
      steps : this.getSteps()
    };
  },

  actions: {
    save() {
      console.log('save');
    },
    move() {
      console.log('move');
    }
  }
});
