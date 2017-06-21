import Ember from 'ember';

const { Route } = Ember;

export default Route.extend({
  titleToken() {
    switch (this.get('params.users_status')) {
      case 'active':
        return this.l10n.t('Active');
      case 'deleted':
        return this.l10n.t('Deleted');
    }
  },
  model(params) {
    this.set('params', params);
    return [{
      name        : 'Test name 1',
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
      name        : 'Test name 2',
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
      name        : 'Test name 3',
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
      name        : 'Test name 4',
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
      name        : 'Test name 5',
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
