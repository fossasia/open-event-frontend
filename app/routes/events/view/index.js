import Route from '@ember/routing/route';
import { allSettled } from 'rsvp';
import EmberTableRouteMixin from 'open-event-frontend/mixins/ember-table-route';

export default class extends Route.extend(EmberTableRouteMixin) {

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
    const sessionTypesPromise = eventDetails.query('sessionTypes', {});
    const tracksPromise = eventDetails.query('tracks', {});
    const microlocationsPromise = eventDetails.query('microlocations', {});
    const speakersCallPromise = eventDetails.query('speakersCall', {});
    const socialLinksPromise = eventDetails.query('socialLinks', {});
    const statisticsPromise = eventDetails.query('generalStatistics', {});
    const orderStatPromise = eventDetails.query('orderStatistics', {});
    const ticketsPromise = eventDetails.query('tickets', {});

    const [sponsors, roleInvites, sessionTypes, tracks, microlocations, speakersCall, socialLinks,
      statistics, orderStat, tickets, usersEventsRoles] = (await allSettled([sponsorsPromise, roleInvitesPromise, sessionTypesPromise, tracksPromise, microlocationsPromise, speakersCallPromise, socialLinksPromise,
      statisticsPromise, orderStatPromise, ticketsPromise, usersEventsRolesPromise])).map(result => result.value);


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
