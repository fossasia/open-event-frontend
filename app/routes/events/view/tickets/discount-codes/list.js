import Route from '@ember/routing/route';
import EmberTableRouteMixin from 'open-event-frontend/mixins/ember-table-route';
import moment from 'moment';

export default class extends Route.extend(EmberTableRouteMixin) {
  titleToken() {
    switch (this.params.discount_status) {
      case 'active':
        return this.l10n.t('Active');
      case 'inactive':
        return this.l10n.t('Inactive');
      case 'expired':
        return this.l10n.t('Expired');
    }
  }

  async model(params) {
    this.set('params', params);
    let filterOptions = [];
    const searchField = 'code';
    if (params.discount_status === 'active') {
      filterOptions = [
        {
          and: [
            {
              name : 'valid_till',
              op   : 'ge',
              val  : moment().toISOString()
            },
            {
              name : 'is-active',
              op   : 'eq',
              val  : true
            }
          ]
        }
      ];
    } else if (params.discount_status === 'inactive') {
      filterOptions = [
        {
          and: [
            {
              name : 'valid_till',
              op   : 'ge',
              val  : moment().toISOString()
            },
            {
              name : 'is-active',
              op   : 'eq',
              val  : false
            }
          ]
        }
      ];
    } else if (params.discount_status === 'expired') {
      filterOptions = [
        {
          name : 'valid_till',
          op   : 'lt',
          val  : moment().toISOString()
        }
      ];
    } else {
      filterOptions = [];
    }

    filterOptions = this.applySearchFilters(filterOptions, params, searchField);
    let queryString = {
      filter         : filterOptions,
      'page[size]'   : params.per_page || 10,
      'page[number]' : params.page || 1
    };

    queryString = this.applySortFilters(queryString, params);

    return  this.asArray(this.modelFor('events.view').query('discountCodes', queryString));
  }
}
