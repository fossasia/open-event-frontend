import Route from '@ember/routing/route';
import { action } from '@ember/object';
import EmberTableRouteMixin from 'open-event-frontend/mixins/ember-table-route';
export default class extends Route.extend(EmberTableRouteMixin) {
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
  }

  beforeModel() {
    this._super(...arguments);
    let event = this.modelFor('events.view');
    let { currentUser } = this.authManager;
    if (!(currentUser.isAnAdmin || currentUser.email === event.owner.get('email') || event.organizers.includes(currentUser)
      || event.coorganizers.includes(currentUser) || event.trackOrganizers.includes(currentUser)
      || event.registrars.includes(currentUser) || event.moderators.includes(currentUser))) {
      this.transitionTo('public', event.id);
    }
  }

  async model(params) {
    this.set('params', params);
    const searchField = 'title';
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

    let store = this.modelFor('events.view');
    let queryObject = {
      include : 'session',
      filter  : [
        {
          name : 'session',
          op   : 'has',
          val  : {
            name : 'event',
            op   : 'has',
            val  : {
              name : 'identifier',
              op   : 'eq',
              val  : store.id
            }
          }
        }
      ]
    };
    let feedbacks = await this.authManager.currentUser.query('feedbacks', queryObject);

    filterOptions = this.applySearchFilters(filterOptions, params, searchField);
    let queryString = {
      include        : 'speakers,feedbacks',
      filter         : filterOptions,
      'page[size]'   : params.per_page || 10,
      'page[number]' : params.page || 1
    };
    queryString = this.applySortFilters(queryString, params);

    return {
      sessions: await this.asArray(store.query('sessions', queryString)),
      feedbacks
    };
  }

  @action
  refreshRoute() {
    this.refresh();
  }
}
