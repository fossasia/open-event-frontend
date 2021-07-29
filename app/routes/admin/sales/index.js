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

  queryParams = {
    sort: {
      refreshModel: true
    }
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
    let x = await this.asArray(this.store.query('admin-sales-by-event', queryString));
    
    switch(params.sort){
      case 'completed_ticket':
        x.data.sort(function(a, b) { return b.sales.completed['ticket_count'] - a.sales.completed['ticket_count'] });
        break;
      case 'placed_ticket':
        x.data.sort(function(a, b) { return b.sales.placed['ticket_count'] - a.sales.placed['ticket_count'] });
        break;
      case 'pending_ticket':
        x.data.sort(function(a, b) { return b.sales.pending['ticket_count'] - a.sales.pending['ticket_count'] });
        break;
      case 'completed_sales':
        x.data.sort(function(a, b) { return b.sales.completed['sales_total'] - a.sales.completed['sales_total'] });
        break;
      case 'placed_sales':
        x.data.sort(function(a, b) { return b.sales.placed['sales_total'] - a.sales.placed['sales_total'] });
        break;
      case 'pending_sales':
        x.data.sort(function(a, b) { return b.sales.pending['sales_total'] - a.sales.pending['sales_total'] });
        break;
      default:
        break;
    }
    return x;
  }

  @action
  refreshRoute() {
    this.refresh();
  }
}
