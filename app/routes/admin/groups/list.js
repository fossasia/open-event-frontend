import Route from '@ember/routing/route';
import EmberTableRouteMixin from 'open-event-frontend/mixins/ember-table-route';
import { action } from '@ember/object';
// import moment from 'moment';

export default class extends Route.extend(EmberTableRouteMixin) {
  titleToken() {
    switch (this.router.currentRoute.attributes.group_status) {
      case 'live':
        return this.l10n.t('Live');
      case 'deleted':
        return this.l10n.t('Deleted');
      default:
        return this.l10n.t('Live');
    }
  }

  async model(params) {
    this.set('params', params);
    // let filterOptions = [];
    // const searchField = 'name';
    // if (params.group_status === 'live') {
    // filterOptions = [
    //   {
    //     and: [
    //       {
    //         name : 'deleted-at',
    //         op   : 'eq',
    //         val  : null
    //       },
    //       {
    //         name : 'name',
    //         op   : 'eq',
    //         val  : 'published'
    //       },
    //       {
    //         or: [
    //           {
    //             name : 'starts-at',
    //             op   : 'ge',
    //             val  : moment().toISOString()
    //           },
    //           {
    //             and: [
    //               {
    //                 name : 'starts-at',
    //                 op   : 'le',
    //                 val  : moment().toISOString()
    //               },
    //               {
    //                 name : 'ends-at',
    //                 op   : 'gt',
    //                 val  : moment().toISOString()
    //               }
    //             ]
    //           }
    //         ]
    //       }
    //     ]
    //   }
    // ];
    // } else if (params.events_status === 'deleted') {
    // filterOptions = [
    //     {
    //       name : 'deleted-at',
    //       op   : 'ne',
    //       val  : null
    //     }
    //   ];
    // } else {
    //   filterOptions = [];
    // }

    // filterOptions = this.applySearchFilters(filterOptions, params, searchField);
    // let queryString = {
    //   get_trashed    : true,
    //   include        : 'user,events',
    // filter         : filterOptions,
    // 'page[size]'   : params.per_page || 10,
    // 'page[number]' : params.page || 1
    // };
    // queryString = this.applySortFilters(queryString, params);
    // return  this.asArray(this.store.query('group', queryString));
    const response = await fetch('/api/fakeData.json');
    const parsed = await response.json();
    return parsed;
  }

  @action
  refreshRoute() {
    this.refresh();
  }
}
