import attr from 'ember-data/attr';
import { computed } from '@ember/object';
import ModelBase from 'open-event-frontend/models/base';
import { belongsTo } from 'ember-data/relationships';

export default ModelBase.extend({
  subject        : attr('string'),
  actionType     : attr('string'),
  subjectId      : attr('string'),
  link           : attr('string'),
  notificationId : attr('string'),

  notification: belongsTo('notification'),

  /**
   * Computed properties
   */
  buttonTitle: computed('subject', 'actionType', function() {
    let action;
    switch (this.actionType) {
      case 'download':
        action = 'Download';
        break;

      case 'submit':
        action = 'Submit';
        break;

      default:
        action = 'View';
    }

    let buttonSubject;
    switch (this.subject) {
      case 'event-export':
        buttonSubject = ' Event';
        break;

      case 'event':
        buttonSubject = ' Event';
        break;

      case 'invoice':
        buttonSubject = ' Invoice';
        break;

      case 'order':
        buttonSubject = ' Order';
        break;

      case 'tickets-pdf':
        buttonSubject = ' Tickets';
        break;

      case 'event-role':
        buttonSubject = ' Invitation Link';
        break;

      case 'session':
        buttonSubject = ' Session';
        break;

      case 'call-for-speakers':
        if (this.actionType === 'submit') {
          buttonSubject = ' Proposal';
        } else {
          buttonSubject = ' Call for Speakers';
        }

        break;

      default:
        // Nothing here.
    }

    return action + buttonSubject;
  }),
  /**
   * The route name to which the action button will direct the user to.
   */
  buttonRoute: computed('subject', function() {
    let routeName;
    switch (this.subject) {
      case 'event-export':
        routeName = 'events.view';
        break;

      case 'event':
        routeName = 'events.view';
        break;

      case 'invoice':
        routeName = 'orders.view';
        break;

      case 'order':
        routeName = 'orders.view';
        break;

      case 'session':
        routeName = 'my-sessions.view';
        break;

      default:
      // Nothing here.
    }

    return routeName;
  })
});
