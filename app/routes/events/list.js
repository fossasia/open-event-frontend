import Ember from 'ember';

const { Route } = Ember;

export default Route.extend({
  titleToken() {
    switch (this.get('params.event_state')) {
      case 'live':
        return this.l10n.t('Live');
      case 'draft':
        return this.l10n.t('Draft');
      case 'past':
        return this.l10n.t('Past');
    }
  },
  model(params) {
    this.set('params', params);
    return [{
      name    : 'Event_Name2',
      startAt : new Date(),
      endAt   : new Date(),
      roles   : [{
        type  : 'Organiser',
        email : 'sample@sample.com'
      },
      {
        type  : 'Organiser',
        email : 'sample2@sample.com'
      }
      ],
      tickets: [{
        type  : 'Premium',
        order : 12,
        total : 100
      },
      {
        type  : 'VIP',
        order : 10,
        total : 10
      }],
      sessions: [{
        type   : 'Drafts',
        number : 1
      },
      {
        type   : 'Submitted',
        number : 40
      },
      {
        type   : 'Accepted',
        number : 10
      },
      {
        type   : 'Confirmed',
        number : 19
      },
      {
        type   : 'Pending',
        number : 1
      },
      {
        type   : 'Rejected',
        number : 15
      }],
      speakers : 2,
      url      : 'http://127.0.0.1:4200/events/live',
      links    : '',
      image    : 'http://placehold.it/200x200'
    }];
  }
});
