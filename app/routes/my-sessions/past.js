import Ember from 'ember';

const { Route } = Ember;
export default Route.extend({
  titleToken() {
    return this.l10n.t('Past');
  },
  model() {
    return [
      {
        title    : 'Super duper cool JS',
        state    : 'rejected',
        event    : 'OS Tech',
        status   : 'Rejected',
        startsAt : new Date(),
        endsAt   : new Date()
      }
    ];
  }
});
