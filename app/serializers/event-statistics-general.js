import ApplicationSerializer from 'open-event-frontend/serializers/application';

export default ApplicationSerializer.extend({
  attrs: {
    speakersAccepted  : 'speakers.accepted',
    speakersConfirmed : 'speakers.confirmed',
    speakersPending   : 'speakers.pending',
    speakersRejected  : 'speakers.rejected',
    speakers          : 'speakers.total'
  }
});
