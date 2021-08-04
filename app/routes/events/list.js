import Route from '@ember/routing/route';
import { action } from '@ember/object';
import moment from 'moment';
import EmberTableRouteMixin from 'open-event-frontend/mixins/ember-table-route';
export default class extends Route.extend(EmberTableRouteMixin) {

  titleToken() {
    switch (this.params.event_state) {
      case 'live':
        return this.l10n.t('Live');
      case 'draft':
        return this.l10n.t('Draft');
      case 'past':
        return this.l10n.t('Past');
    }
  }

  beforeModel(transition) {
    super.beforeModel(...arguments);
    const eventState = transition.to.params.event_state;
    if (!['live', 'draft', 'past'].includes(eventState)) {
      this.replaceWith('events.view', eventState);
    }

  }

  async model(params) {
    this.set('params', params);
    let filterOptions = [];
    const searchField = 'name';
    if (params.event_state === 'live') {
      filterOptions = [
        {
          name : 'state',
          op   : 'eq',
          val  : 'published'
        },
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
    } else if (params.event_state === 'past') {
      filterOptions = [
        {
          name : 'ends-at',
          op   : 'lt',
          val  : moment().toISOString()
        },
        {
          name : 'state',
          op   : 'eq',
          val  : 'published'
        }
      ];
    } else {
      filterOptions = [
        {
          name : 'state',
          op   : 'eq',
          val  : 'draft'
        }
      ];
    }
    filterOptions = this.applySearchFilters(filterOptions, params, searchField);
    let queryString = {
      include        : 'general-statistics,roles.role,roles.user,tickets',
      filter         : filterOptions,
      'page[size]'   : params.per_page || 10,
      'page[number]' : params.page || 4
    };
    queryString = this.applySortFilters(queryString, params);
    return this.asArray(this.authManager.currentUser.query('events', queryString));
  }

  @action
  refreshRoute() {
    this.refresh();
  }
}
