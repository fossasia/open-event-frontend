import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import EventWizardMixin from 'open-event-frontend/mixins/event-wizard';
import { inject as service } from '@ember/service';
import { hash } from 'rsvp';

@classic
export default class CreateRoute extends Route.extend(AuthenticatedRouteMixin, EventWizardMixin) {

  @service
  session;

  titleToken() {
    return this.l10n.t('Create an Event');
  }

  beforeModel() {
    if (!this.session.isAuthenticated) {
      this.session.previousRouteName = '/create';
      this.flashMessages.add({
        message           : 'Please login to create an event. If you have not registered yet, please create an account first. Thank you!',
        type              : 'negative',
        preventDuplicates : true
      });
    }
    super.beforeModel(...arguments);
  }

  async model() {

    return hash({
      event: this.store.createRecord('event', {
        socialLinks         : [],
        copyright           : this.store.createRecord('event-copyright'),
        stripeAuthorization : this.store.createRecord('stripe-authorization')
      }),
      types: this.store.query('event-type', {
        sort: 'name'
      }),
      topics: this.store.query('event-topic', {
        sort    : 'name',
        include : 'event-sub-topics'
      }),
      steps: this.getSteps()
    });
  }
}
