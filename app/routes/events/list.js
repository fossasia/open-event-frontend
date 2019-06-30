import Route from '@ember/routing/route';
import { action } from '@ember/object';
import moment from 'moment';

export default class extends Route {

  queryParams = {
    page: {
      refreshModel: true
    },
    per_page: {
      refreshModel: true
    },
    search: {
      refreshModel: true
    },
    sort_dir: {
      refreshModel: true
    },
    sort_by: {
      refreshModel: true
    }
  };

  filterOptions = [];

  titleToken() {
    switch (this.get('params.event_state')) {
      case 'live':
        return this.l10n.t('Live');
      case 'draft':
        return this.l10n.t('Draft');
      case 'past':
        return this.l10n.t('Past');
    }
  }

  beforeModel(transition) {
    this._super(...arguments);
    const eventState = transition.to.params.event_state;
    if (!['live', 'draft', 'past'].includes(eventState)) {
      this.replaceWith('events.view', eventState);
    }

  }

  async model(params) {
    this.set('params', params);
    const searchField = 'name';
    if (params.event_state === 'live') {
      this.filterOptions = [
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
      this.filterOptions = [
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
      this.filterOptions = [
        {
          name : 'state',
          op   : 'eq',
          val  : 'draft'
        }
      ];
    }

    if (params.search) {
      this.filterOptions.pushObject({
        name : searchField,
        op   : 'ilike',
        val  : `%${params.search}%`
      });
    } else {
      this.filterOptions.removeObject({
        name : searchField,
        op   : 'ilike',
        val  : `%${params.search}%`
      });
    }


    let queryString = {
      include        : 'tickets,sessions,speakers,owners,organizers,coorganizers,track-organizers,registrars,moderators',
      filter         : this.filterOptions,
      'page[size]'   : params.per_page || 10,
      'page[number]' : params.page || 4
    };

    if (params.sort_by && params.sort_dir) {
      queryString.sort = `${params.sort_dir === 'ASC' ? '-' : ''}${params.sort_by}`;
    }
    else {
      delete queryString.sort;
    }
    return {
      data: await this.authManager.currentUser.query('events', queryString)
    };

  }

  @action
  refreshRoute() {
    this.refresh();
  }
}
