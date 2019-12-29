import Controller from '@ember/controller';

export default Controller.extend({
  queryParams  : ['category', 'sub_category', 'event_type', 'start_date', 'end_date', 'location', 'ticket_type', 'cfs'],
  category     : null,
  sub_category : null,
  event_type   : null,
  start_date   : null,
  end_date     : null,
  location     : null,
  ticket_type  : null,
  cfs          : null,

  actions: {
    shareEvent(event) {
      this.set('eventToShare', event);
      this.set('isShareModalOpen', true);
    },
    clearFilter(filterType) {
      if (filterType === 'start_date') {
        this.set('startDate', null);
      }

      if (filterType === 'end_date') {
        this.set('endDate', null);
      }

      if (filterType === 'category') {
        this.set('category', null);
      }

      if (filterType === 'sub_category') {
        this.set('sub_category', null);
      }

      if (filterType === 'event_type') {
        this.set('event_type', null);
      }

      if (filterType === 'location') {
        this.set('location', null);
      }

      if (filterType === 'ticket_type') {
        this.set('ticket_type', null);
      }

      if (filterType === 'cfs') {
        this.set('cfs', null);
      }
    }
  }
});
