import Route from '@ember/routing/route';

export default Route.extend({
  titleToken() {
    switch (this.get('params.session_status')) {
      case 'pending':
        return this.l10n.t('Pending');
      case 'confirmed':
        return this.l10n.t('Confirmed');
      case 'accepted':
        return this.l10n.t('Accepted');
      case 'rejected':
        return this.l10n.t('Rejected');
      default:
        return this.l10n.t('Session');
    }
  },
  async model(params) {
    this.set('params', params);
    let filterOptions = [];
    if (params.session_status === 'pending') {
      filterOptions = [
        {
          name : 'state',
          op   : 'eq',
          val  : 'pending'
        }
      ];
    } else if (params.session_status === 'accepted') {
      filterOptions = [
        {
          name : 'state',
          op   : 'eq',
          val  : 'accepted'
        }
      ];
    } else if (params.session_status === 'rejected') {
      filterOptions = [
        {
          name : 'state',
          op   : 'eq',
          val  : 'rejected'
        }
      ];
    } else if (params.session_status === 'confirmed') {
      filterOptions = [
        {
          name : 'state',
          op   : 'eq',
          val  : 'confirmed'
        }
      ];
    } else {
      filterOptions = [];
    }

    let queryObject = {
      include      : 'speakers',
      filter       : filterOptions,
      'page[size]' : 10
    };

    let store = this.modelFor('events.view');

    let data =  await store.query('sessions', queryObject);

    return {
      data,
      store,
      query      : queryObject,
      objectType : 'sessions'
    };
  },

  actions: {
    refreshRoute() {
      this.refresh();
    }
  }

});
