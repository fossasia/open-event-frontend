import Ember from 'ember';
import EventWizardMixin from 'open-event-frontend/mixins/event-wizard';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const { Route } = Ember;

export default Route.extend(AuthenticatedRouteMixin, EventWizardMixin, {
  titleToken() {
    return this.l10n.t('Edit Event');
  },

  beforeModel(transition) {
    this._super(...arguments);
    if (transition.targetName === 'events.view.edit.index') {
      this.transitionTo('events.view.edit.basic-details');
    }
  },

  model() {
    return {
      event : this.modelFor('events.view'),
      steps : this.getSteps(),
      types : this.store.query('event-type', {
        sort: 'name'
      }),
      topics: this.store.query('event-topic', {
        sort    : 'name',
        include : 'event-sub-topics'
      })
    };
  },

  actions: {
    save() {

    },
    move() {

    }
  }
});
