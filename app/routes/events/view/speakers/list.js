import Ember from 'ember';

const { Route } = Ember;

export default Route.extend({
  titleToken() {
    switch (this.get('params.speakers_status')) {
      case 'pending':
        return this.l10n.t('Pending');
      case 'accepted':
        return this.l10n.t('Accepted');
      case 'rejected':
        return this.l10n.t('Rejected');
    }
  },
  model(params) {
    this.set('params', params);
    return this.modelFor('events.view').query('speakers', {
      include: 'sessions'
    });
  }
});
