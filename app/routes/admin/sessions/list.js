import Ember from 'ember';

const { Route } = Ember;

export default Route.extend({
  titleToken() {
    switch (this.get('params.sessions_state')) {
      case 'pending':
        return this.l10n.t('Pending');
      case 'accepted':
        return this.l10n.t('Accepted');
      case 'rejected':
        return this.l10n.t('Rejected');
      case 'deleted':
        return this.l10n.t('Deleted');
      default:
        return this.l10n.t('Session');
    }
  },
  model(params) {
    this.set('params', params);
    let filterOptions = [];
    if (params.sessions_state === 'pending') {
      filterOptions = [
        {
          name : 'state',
          op   : 'eq',
          val  : 'pending'
        }
      ];
    } else if (params.sessions_state === 'accepted') {
      filterOptions = [
        {
          name : 'state',
          op   : 'eq',
          val  : 'accepted'
        }
      ];
    } else if (params.sessions_state === 'rejected') {
      filterOptions = [
        {
          name : 'state',
          op   : 'eq',
          val  : 'rejected'
        }
      ];
    } else if (params.sessions_state === 'deleted') {
      filterOptions = [
        {
          name : 'state',
          op   : 'eq',
          val  : 'deleted'
        }
      ];
    } else {
      filterOptions = [];
    }
    return this.get('store').query('session', {
      include      : 'event,speakers',
      filter       : filterOptions,
      'page[size]' : 10
    });
  }
});
