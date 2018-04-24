import Route from '@ember/routing/route';

export default Route.extend({
  async model() {
    let eventDetails = this.modelFor('events.view');
    return {
      event    : await eventDetails,
      sponsors : await eventDetails.query('sponsors', {
        'page[size]': 10
      }),
      roleInvites  : await eventDetails.query('roleInvites', {}),
      sessionTypes : await eventDetails.query('sessionTypes', {}),
      socialLinks  : await eventDetails.query('socialLinks', {}),
      statistics   : await eventDetails.query('eventStatisticsGeneral', {}),
      orderStat    : await eventDetails.query('orderStatistics', {}),
      tickets      : await eventDetails.query('tickets', {}),
      roles        : await this.store.findAll('role')
    };
  }
});
