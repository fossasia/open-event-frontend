import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import EventWizardMixin from 'open-event-frontend/mixins/event-wizard';

export default Route.extend(AuthenticatedRouteMixin, EventWizardMixin, {
  titleToken() {
    return this.get('l10n').t('Create an Event');
  },
  model() {
    return {
      data: {
        event: this.store.createRecord('event', {
          socialLinks : [],
          tax         : this.store.createRecord('tax'),
          copyright   : this.store.createRecord('event-copyright')
        }),
        types: this.store.query('event-type', {
          sort: 'name'
        }),
        topics: this.store.query('event-topic', {
          sort    : 'name',
          include : 'event-sub-topics'
        })
      },
      steps: this.getSteps()
    };
  }
});
