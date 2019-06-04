import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import EventWizardMixin from 'open-event-frontend/mixins/event-wizard';

export default Route.extend(AuthenticatedRouteMixin, EventWizardMixin, {
  titleToken() {
    return this.l10n.t('Create an Event');
  },
  async model() {
    return {
      event: this.store.createRecord('event', {
        socialLinks         : [],
        tax                 : this.store.createRecord('tax'),
        copyright           : this.store.createRecord('event-copyright'),
        stripeAuthorization : this.store.createRecord('stripe-authorization')
      }),
      module : await this.store.queryRecord('module', {}),
      types  : await this.store.query('event-type', {
        sort: 'name'
      }),
      topics: await this.store.query('event-topic', {
        sort    : 'name',
        include : 'event-sub-topics'
      }),
      steps: this.getSteps()
    };
  }
});
