import Route from '@ember/routing/route';
import EmberTableRouteMixin from 'open-event-frontend/mixins/ember-table-route';

export default class extends Route.extend(EmberTableRouteMixin) {

  async model(params) {
    let eventDetails = this.modelFor('events.view');
    const searchField = 'name';
    let filterOptions = [];
    filterOptions = this.applySearchFilters(filterOptions, params, searchField);
    let queryString = {
      filter         : filterOptions,
      'page[size]'   : params.per_page || 10,
      'page[number]' : params.per_page || 1
    };
    queryString = this.applySortFilters(queryString, params);


    return {
      event        : await eventDetails,
      sponsors     : await this.asArray(eventDetails.query('sponsors', {}, queryString)),
      roleInvites  : await eventDetails.query('roleInvites', {}),
      sessionTypes : await eventDetails.query('sessionTypes', {}),
      socialLinks  : await eventDetails.query('socialLinks', {}),
      statistics   : await eventDetails.query('generalStatistics', {}),
      orderStat    : await eventDetails.query('orderStatistics', {}),
      tickets      : await eventDetails.query('tickets', {}),
      roles        : await this.store.findAll('role')
    };
  }
}
