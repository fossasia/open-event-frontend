import Ember from 'ember';

const { Route } = Ember;

export default Route.extend({
  titleToken() {
    switch (this.get('params.events_status')) {
      case 'live':
        return this.i18n.t('Live');
      case 'draft':
        return this.i18n.t('Draft');
      case 'past':
        return this.i18n.t('Past');
      case 'deleted':
        return this.i18n.t('Deleted');
    }
  },
  model(params) {
    this.set('params', params);
    return [{
      name      : 'Testname 1',
      state     : 'Published',
      publicUrl : 'Testname1@fossasia.com',
      startAt   : new Date(),
      endAt     : new Date(),
      roles     : [
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
      sessions: {
        draft     : 1,
        submitted : 0,
        accepted  : 1,
        confirmed : 0,
        pending   : 1,
        rejected  : 0
      },
      speaker : 3,
      tickets : [{
        name  : 'Premium',
        order : 12,
        total : 100
      },
      {
        name  : 'VIP',
        order : 10,
        total : 10
      }]
    },
    {
      name      : 'Testname 2',
      state     : 'Published',
      publicUrl : 'Testname2@fossasia.com',
      startAt   : new Date(),
      endAt     : new Date(),
      roles     : [
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
      sessions: {
        draft     : 1,
        submitted : 0,
        accepted  : 1,
        confirmed : 0,
        pending   : 1,
        rejected  : 0
      },
      speaker : 3,
      tickets : [{
        name  : 'Premium',
        order : 12,
        total : 100
      },
      {
        name  : 'VIP',
        order : 10,
        total : 10
      }]
    },
    {
      name      : 'Testname 3',
      state     : 'Published',
      publicUrl : 'Testname3@fossasia.com',
      startAt   : new Date(),
      endAt     : new Date(),
      roles     : [
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
      sessions: {
        draft     : 1,
        submitted : 0,
        accepted  : 1,
        confirmed : 0,
        pending   : 1,
        rejected  : 0
      },
      speaker : 3,
      tickets : [{
        name  : 'Premium',
        order : 12,
        total : 100
      },
      {
        name  : 'VIP',
        order : 10,
        total : 10
      }]
    },
    {
      name      : 'Testname 1',
      state     : 'Published',
      publicUrl : 'Testname1@fossasia.com',
      startAt   : new Date(),
      endAt     : new Date(),
      roles     : [
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
      sessions: {
        draft     : 1,
        submitted : 0,
        accepted  : 1,
        confirmed : 0,
        pending   : 1,
        rejected  : 0
      },
      speaker : 3,
      tickets : [{
        name  : 'Premium',
        order : 12,
        total : 100
      },
      {
        name  : 'VIP',
        order : 10,
        total : 10
      }]
    },
    {
      name      : 'Testname 1',
      state     : 'Published',
      publicUrl : 'Testname1@fossasia.com',
      startAt   : new Date(),
      endAt     : new Date(),
      roles     : [
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
      sessions: {
        draft     : 1,
        submitted : 0,
        accepted  : 1,
        confirmed : 0,
        pending   : 1,
        rejected  : 0
      },
      speaker : 3,
      tickets : [{
        name  : 'Premium',
        order : 12,
        total : 100
      },
      {
        name  : 'VIP',
        order : 10,
        total : 10
      }]
    }];
  }
});
