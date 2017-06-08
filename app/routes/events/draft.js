import Ember from 'ember';

const { Route } = Ember;

export default Route.extend({
  titleToken() {
    return this.i18n.t('Draft');
  },
  model() {
    return [{
      name     : 'Sample_event',
      startAt  : new Date('2013-05-10T01:55:00+01:00'),
      endAt    : new Date('2013-05-11T01:55:00+01:00'),
      roles    : 'john_doe@gmail.com',
      tickets  : [8, 15, 2, 5, 60, 80, 150, 200],
      sessions : [2, 3, 2, 3, 1, 1],
      speakers : '3',
      url      : 'http://Sample_event.com',
      links    : ['link1', 'link2', 'link3'],
      image    : 'http://placehold.it/200x200'
    },
    {
      name     : 'Sample_event',
      startAt  : new Date('2013-05-10T01:55:00+01:00'),
      endAt    : new Date('2013-05-11T01:55:00+01:00'),
      roles    : 'john_doe@gmail.com',
      tickets  : [8, 15, 2, 5, 60, 80, 150, 200],
      sessions : [2, 3, 2, 3, 1, 1],
      speakers : '3',
      url      : 'http://Sample_event.com',
      links    : ['link1', 'link2', 'link3'],
      image    : 'http://placehold.it/200x200'
    }];
  }
});
