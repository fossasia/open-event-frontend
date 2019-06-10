import Route from '@ember/routing/route';

export default Route.extend({
  titleToken() {
    switch (this.get('params.attendees_status')) {
      case 'placed':
        return this.l10n.t('Placed');
      case 'pending':
        return this.l10n.t('Pending');
      case 'expired':
        return this.l10n.t('Expired');
      case 'cancelled':
        return this.l10n.t('Cancelled');
      case 'checkedIn':
        return this.l10n.t('Checked In');
      case 'notCheckedIn':
        return this.l10n.t('Not Checked In');
      case 'all':
        return this.l10n.t('All');
    }
  },
  async model(params) {
    this.set('params', params);
    let filterOptions = [];
    if (params.attendees_status === 'checkedIn') {
      filterOptions = [
        {
          name : 'is-checked-in',
          op   : 'eq',
          val  : true
        }
      ];
    } else if (params.attendees_status === 'notCheckedIn') {
      filterOptions = [
        {
          name : 'is-checked-in',
          op   : 'eq',
          val  : false
        }
      ];
    } else if (params.attendees_status === 'all') {
      filterOptions = [];
    } else {
      filterOptions = [
        {
          name : 'order',
          op   : 'has',
          val  : {
            name : 'status',
            op   : 'eq',
            val  : params.attendees_status
          }
        }
      ];
    }

    let queryObject = {
      include      : 'order.user,user',
      filter       : filterOptions,
      'page[size]' : 10
    };

    let store = this.modelFor('events.view');

    let data = await store.query('attendees', queryObject);

    return {
      data,
      store,
      query      : queryObject,
      objectType : 'attendees'
    };
  },
});
