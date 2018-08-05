import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Route.extend(AuthenticatedRouteMixin, {
  titleToken(model) {
    var speakerName = model.speaker.get('name');
    return this.get('l10n').t(speakerName.concat('-Edit'));
  },
  async model(params) {
    const eventDetails = this.modelFor('events.view');
    return {
      event : eventDetails,
      form  : await eventDetails.query('customForms', {
        'page[size]' : 50,
        sort         : 'id'
      }),
      speaker: await this.get('store').findRecord('speaker', params.speaker_id)
    };
  }
});
