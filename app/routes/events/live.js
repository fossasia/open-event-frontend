import Ember from 'ember';

const { Route } = Ember;

export default Route.extend({
  titleToken() {
    return this.i18n.t('Live');
  },
  model() {
    return [{
      name     : 'Event_Name2',
      startAt  : 'March 20, 2015 - 05:30 PM',
      endAt    : 'March 20, 2016 - 05:30 PM',
      roles    : 'sample@gmail.com (Organizer)',
      tickets  : '',
      sessions : '',
      speakers : '2',
      url      : 'url here',
      links    : '',
      image    : 'http://placehold.it/200x200'
    }];
  }
});
