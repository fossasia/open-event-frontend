import Ember from 'ember';

const { Route } = Ember;

export default Route.extend({
  titleToken() {
    return this.l10n.t('Users');
  },
  model() {
    return [{
      name        : 'Testname 1',
      email       : 'Testname1@gmail.com',
      status      : 'active',
      systemRoles : ['unverified user1', 'unverified user2'],
      eventRoles  : [
        {
          name  : 'Organizer',
          event : {
            name: 'Event One'
          }
        },
        {
          name  : 'Organizer',
          event : {
            name: 'Event Two'
          }
        }
      ],
      createdAt      : new Date(),
      lastAccessedAt : new Date()
    },
    {
      name        : 'Testname 2',
      email       : 'Testname2@gmail.com',
      status      : 'inactive',
      systemRoles : ['unverified user1', 'unverified user2'],
      eventRoles  : [
        {
          name  : 'Organizer',
          event : {
            name: 'Event two'
          }
        }
      ],
      createdAt      : new Date(),
      lastAccessedAt : new Date()
    },
    {
      name        : 'Testname 3',
      email       : 'Testname3@gmail.com',
      status      : 'active',
      systemRoles : ['unverified user1', 'unverified user2'],
      eventRoles  : [
        {
          name  : 'Organizer',
          event : {
            name: 'Event One'
          }
        }
      ],
      createdAt      : new Date(),
      lastAccessedAt : new Date()
    },
    {
      name        : 'Testname 4',
      email       : 'Testname4@gmail.com',
      status      : 'active',
      systemRoles : ['unverified user1', 'unverified user2'],
      eventRoles  : [
        {
          name  : 'Organizer',
          event : {
            name: 'Event One'
          }
        }
      ],
      createdAt      : new Date(),
      lastAccessedAt : new Date()
    },
    {
      name        : 'Testname 5',
      email       : 'Testname5@gmail.com',
      status      : 'active',
      systemRoles : ['unverified user1', 'unverified user2'],
      eventRoles  : [
        {
          name  : 'Organizer',
          event : {
            name: 'Event One'
          }
        }
      ],
      createdAt      : new Date(),
      lastAccessedAt : new Date()
    }];
  }
});
