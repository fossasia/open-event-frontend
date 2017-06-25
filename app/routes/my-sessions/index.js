import Ember from 'ember';

const { Route } = Ember;
export default Route.extend({
  titleToken() {
    return this.l10n.t('Upcomming');
  },
  templateName: 'my-sessions/past',
  model() {
    return [
      {
        title    : 'Super cool JS',
        state    : 'rejected',
        event    : 'OS Tech',
        status   : 'Rejected',
        startsAt : new Date(),
        endsAt   : new Date()
      },
      {
        title    : 'A cup of coffee with Java',
        state    : 'accepted',
        event    : 'FOSS Hero',
        status   : 'Accepted',
        startsAt : new Date(),
        endsAt   : new Date()
      },
      {
        title    : 'Snakes & ladder with python',
        state    : 'pending',
        event    : 'FOO Summit',
        status   : 'Under review',
        startsAt : null,
        endsAt   : new Date()
      }
    ];
  }
});
