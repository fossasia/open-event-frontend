import Route from '@ember/routing/route';
import { allSettled } from 'rsvp';
import EmberTableRouteMixin from 'open-event-frontend/mixins/ember-table-route';
import { inject as service } from '@ember/service';

export default class extends Route.extend(EmberTableRouteMixin) {
  @service globalData;
  async model(params) {
    const eventDetails = this.modelFor('events.view');
    const searchField = 'name';
    let filterOptions = [];
    filterOptions = this.applySearchFilters(filterOptions, params, searchField);
    let queryString = {
      filter         : filterOptions,
      'page[size]'   : params.per_page || 10,
      'page[number]' : params.page || 1
    };
    queryString = this.applySortFilters(queryString, params);
    const sponsorsPromise = this.asArray(eventDetails.query('sponsors', queryString));
    const roleInvitesPromise = eventDetails.query('roleInvites', {
      include: 'role'
    });
    const usersEventsRolesPromise = eventDetails.query('roles', {
      include: 'user,role'
    });
    const sessionTypesPromise = eventDetails.query('sessionTypes', { 'page[size]': 0 });
    const tracksPromise = eventDetails.query('tracks', { 'page[size]': 0 });
    const microlocationsPromise = eventDetails.query('microlocations', { 'page[size]': 0 });
    const speakersCallPromise = eventDetails.query('speakersCall', { 'page[size]': 0 });
    const socialLinksPromise = eventDetails.query('socialLinks', { 'page[size]': 0 });
    const statisticsPromise = eventDetails.query('generalStatistics', { 'page[size]': 0 });
    const orderStatPromise = eventDetails.query('orderStatistics', { 'page[size]': 0 });
    const ticketsPromise = eventDetails.query('tickets', {
      'page[size]': 0
    });

    const [sponsors, roleInvites, sessionTypes, tracks, microlocations, speakersCall, socialLinks,
      statistics, orderStat, tickets, usersEventsRoles] = (await allSettled([sponsorsPromise, roleInvitesPromise, sessionTypesPromise, tracksPromise, microlocationsPromise, speakersCallPromise, socialLinksPromise,
      statisticsPromise, orderStatPromise, ticketsPromise, usersEventsRolesPromise])).map(result => result.value);
    this.globalData.setLogoUrl(roleInvites.recordData.__data.logoUrl);
    this.globalData.saveIdEvent(roleInvites.recordData.__data.identifier);

    return {
      event: eventDetails,
      sponsors,
      roleInvites,
      sessionTypes,
      microlocations,
      tracks,
      speakersCall,
      socialLinks,
      statistics,
      orderStat,
      tickets,
      usersEventsRoles
    };
  }
}
