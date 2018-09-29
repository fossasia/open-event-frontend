import Route from '@ember/routing/route';

export default Route.extend({
  titleToken() {
    switch (this.get('params.speakers_status')) {
      case 'pending':
        return this.get('l10n').t('Pending');
      case 'accepted':
        return this.get('l10n').t('Accepted');
      case 'rejected':
        return this.get('l10n').t('Rejected');
    }
  },
  model(params) {
    this.set('params', params);
    let filterOptions = [];
    if (params.speakers_status === 'pending') {
      filterOptions = [
        {
          name : 'sessions',
          op   : 'any',
          val  : {
            name : 'state',
            op   : 'eq',
            val  : 'pending'
          }
        }
      ];
    } else if (params.speakers_status === 'accepted') {
      filterOptions = [
        {
          name : 'sessions',
          op   : 'any',
          val  : {
            name : 'state',
            op   : 'eq',
            val  : 'accepted'
          }
        }
      ];
    } else if (params.speakers_status === 'rejected') {
      filterOptions = [
        {
          name : 'sessions',
          op   : 'any',
          val  : {
            name : 'state',
            op   : 'eq',
            val  : 'rejected'
          }
        }
      ];
    } else if (params.speakers_status === 'confirmed') {
      filterOptions = [
        {
          name : 'sessions',
          op   : 'any',
          val  : {
            name : 'state',
            op   : 'eq',
            val  : 'confirmed'
          }
        }
      ];
    } else {
      filterOptions = [];
    }
    return this.modelFor('events.view').query('speakers', {
      include      : 'sessions',
      filter       : filterOptions,
      'page[size]' : 10
    });
  }
});
