import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';
import { action } from '@ember/object';
import EmberTableRouteMixin from 'open-event-frontend/mixins/ember-table-route';
import moment from 'moment';

@classic
export default class IndexRoute  extends Route.extend(EmberTableRouteMixin) {

  titleToken() {
    return this.l10n.t('Overview');
  }


  async model(params) {
    this.set('params', params);
    let filterOptions = [];
    const searchField = 'name';
    if (params.event_status === 'live') {
      filterOptions = [
        {
          or: [
            {
              name : 'starts-at',
              op   : 'ge',
              val  : moment().toISOString()
            },
            {
              and: [
                {
                  name : 'starts-at',
                  op   : 'le',
                  val  : moment().toISOString()
                },
                {
                  name : 'ends-at',
                  op   : 'gt',
                  val  : moment().toISOString()
                }
              ]
            }
          ]
        }
      ];
    } else if (params.event_status === 'past') {
      filterOptions = [
        {
          name : 'ends-at',
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
    return  this.asArray(this.store.query('admin-sales-by-event', queryString));
  }

  @action
  refreshRoute() {
    this.refresh();
  }
}
