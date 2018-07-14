import Controller from '@ember/controller';

export default Controller.extend({
  queryParams  : ['category', 'sub_category', 'event_type', 'start_date', 'end_date'],
  category     : null,
  sub_category : null,
  event_type   : null,
  start_date   : null,
  end_date     : null,

  actions: {
    shareEvent(event) {
      this.set('eventToShare', event);
      this.set('isShareModalOpen', true);
    }
  }
});
