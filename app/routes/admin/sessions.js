import Ember from 'ember';

const { Route } = Ember;

export default Route.extend({
  titleToken() {
    return this.i18n.t('Sessions');
  },
  model() {
    return [{
      event: {
        name: 'Event1'
      },
      title    : 'Title1',
      speakers : [
        {
          name: 'Speaker1'
        },
        {
          name: 'Speaker2'
        }
      ],
      submittedAt : new Date(),
      startsAt    : new Date(),
      endsAt      : new Date()
    },
    {
      event: {
        name: 'Event1'
      },
      title    : 'Title1',
      speakers : [
        {
          name: 'Speaker1'
        },
        {
          name: 'Speaker2'
        }
      ],
      submittedAt : new Date(),
      startsAt    : new Date(),
      endsAt      : new Date()
    },
    {
      event: {
        name: 'Event1'
      },
      title    : 'Title1',
      speakers : [
        {
          name: 'Speaker1'
        },
        {
          name: 'Speaker2'
        }
      ],
      submittedAt : new Date(),
      startsAt    : new Date(),
      endsAt      : new Date()
    },
    {
      event: {
        name: 'Event1'
      },
      title    : 'Title1',
      speakers : [
        {
          name: 'Speaker1'
        },
        {
          name: 'Speaker2'
        }
      ],
      submittedAt : new Date(),
      startsAt    : new Date(),
      endsAt      : new Date()
    },
    {
      event: {
        name: 'Event1'
      },
      title    : 'Title1',
      speakers : [
        {
          name: 'Speaker1'
        },
        {
          name: 'Speaker2'
        }
      ],
      submittedAt : new Date(),
      startsAt    : new Date(),
      endsAt      : new Date()
    }];
  }
});
