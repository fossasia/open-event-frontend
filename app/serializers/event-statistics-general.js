import ApplicationSerializer from 'open-event-frontend/serializers/application';

export default ApplicationSerializer.extend({
  normalizeResponse(store, primaryModelClass, payload) {
    payload.data.attributes.speakersAccepted = payload.data.attributes.speakers.accepted;
    payload.data.attributes.speakersConfirmed = payload.data.attributes.speakers.confirmed;
    payload.data.attributes.speakersPending = payload.data.attributes.speakers.pending;
    payload.data.attributes.speakersRejected = payload.data.attributes.speakers.rejected;
    payload.data.attributes.speakersTotal = payload.data.attributes.speakers.total;
    return this._super(...arguments);
  },
  attrs: {
    speakersAccepted  : 'speakersAccepted',
    speakersConfirmed : 'speakersConfirmed',
    speakersPending   : 'speakersPending',
    speakersRejected  : 'speakersRejected',
    speakers          : 'speakersTotal'
  }
});
