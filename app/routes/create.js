import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import EventWizardMixin from 'open-event-frontend/mixins/event-wizard';
import { inject as service } from '@ember/service';

@classic
export default class CreateRoute extends Route.extend(AuthenticatedRouteMixin, EventWizardMixin) {

  @service
  session;

  titleToken() {
    return this.l10n.t('Create an Event');
  }

  beforeModel() {
    if (!this.session.isAuthenticated) {
      this.flashMessages.add({
        message           : 'Please login to create an event. If you have not registered yet, please create an account first. Thank you!',
        type              : 'negative',
        preventDuplicates : true
      });
    }
    super.beforeModel(...arguments);
  }

  async model() {

    return {
      event: this.store.createRecord('event', {
        socialLinks         : [],
        tax                 : this.store.createRecord('tax'),
        copyright           : this.store.createRecord('event-copyright'),
        stripeAuthorization : this.store.createRecord('stripe-authorization')
      }),
      types: await this.store.query('event-type', {
        sort: 'name'
      }),
      topics: await this.store.query('event-topic', {
        sort    : 'name',
        include : 'event-sub-topics'
      }),
      steps: this.getSteps()
    };
  }
}
