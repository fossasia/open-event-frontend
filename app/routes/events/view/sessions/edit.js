import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Route.extend(AuthenticatedRouteMixin, {
  titleToken(model) {
    var sessionTitle = model.session.title;
    return this.get('l10n').t(sessionTitle.concat('-Edit'));
  },
  async model(params) {
    const eventDetails = this.modelFor('events.view');
    return {
      event : eventDetails,
      form  : await eventDetails.query('customForms', {
        'page[size]' : 50,
        sort         : 'id'
      }),
      session: await this.get('store').findRecord('session', params.session_id, {
        include: 'track,session-type'
      }),
      tracks       : await eventDetails.query('tracks', {}),
      sessionTypes : await eventDetails.query('sessionTypes', {})

    };
  }
});
