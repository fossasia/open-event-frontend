import Controller from '@ember/controller';

export default Controller.extend({
  queryParams  : ['category', 'sub_category', 'event_type', 'start_date', 'end_date', 'location'],
  category     : null,
  sub_category : null,
  event_type   : null,
  start_date   : null,
  end_date     : null,
  location     : null,

  actions: {
    shareEvent(event) {
      this.set('eventToShare', event);
      this.set('isShareModalOpen', true);
    }
  }
});
