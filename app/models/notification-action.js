import attr from 'ember-data/attr';
import { computed } from '@ember/object';
import ModelBase from 'open-event-frontend/models/base';
import { belongsTo } from 'ember-data/relationships';

export default ModelBase.extend({
  subject        : attr('string'),
  actionType     : attr('string'),
  subjectId      : attr('number'),
  link           : attr('string'),
  notificationId : attr('string'),

  notification: belongsTo('notification'),

  /**
   * Computed properties
   */
  buttonTitle: computed('subject', 'actionType', function() {
    let action;
    const actionType = this.get('actionType');
    switch (actionType) {
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
    const subject = this.get('subject');
    switch (subject) {
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
        if (this.get('actionType') === 'submit') {
          buttonSubject = ' Proposal';
        } else {
          buttonSubject = ' Call for Speakers';
        }
        break;

      default:
        // Nothing here.
    }

    return action + buttonSubject;
  })
});
