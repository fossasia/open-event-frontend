import Ember from 'ember';

const { Route } = Ember;

export default Route.extend({
  titleToken() {
    switch (this.get('params.sessions_state')) {
      case 'pending':
        return this.l10n.t('Pending');
      case 'accepted':
        return this.l10n.t('Accepted');
      case 'rejected':
        return this.l10n.t('Rejected');
      case 'deleted':
        return this.l10n.t('Deleted');
      default:
        return this.l10n.t('Session');
    }
  },
  model(params) {
    this.set('params', params);
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
