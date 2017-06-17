import Ember from 'ember';

const { Route, String } = Ember;

export default Route.extend({
  titleToken() {
    return this.i18n.t('Mail Logs');
  },

  model() {
    return [
      {
        recipient : 'sample@gmail.com',
        time      : new Date(),
        action    : 'Session Accept or Reject',
        subject   : 'Session test proposal has been accepted',
        message   : String.htmlSafe('Hi y@z.com,<br/>The session <strong>test proposal </strong> has been <strong>accepted</strong> by the organizer. <br/> Visit this link to view the session: http://localhost:5000/events/6/sessions/14/')
      },

      {
        recipient : 'sample2@gmail.com',
        time      : new Date(),
        action    : 'User Registration during Payment',
        subject   : 'Welcome to Open Event',
        message   : String.htmlSafe('Your Account Has Been Created! Congratulations!<br/> <strong>Your login:</strong><br><strong>Email:</strong> DS<br><strong>Password:</strong> 92f71692<br><br> Please login and change your password as soon as possible')
      },

      {
        recipient : 'sample3@gmail.com',
        time      : new Date(),
        action    : 'Mail Expired Orders',
        subject   : 'Tickets for Event2 are still available',
        message   : String.htmlSafe('This is just a gentle reminder that the payment for your order O1486216630-3 is still left.<br/> The tickets for this event are still available. <a href="http://localhost:5000/orders/310ee271-2a59-4e70-bcdf-f5a80ed9f0cf/view/">Click here</a> to purchase your ticket for this event.<br><br><em>Looking forward to seeing you at the event.</em>')
      },

      {
        recipient : 'sample5@gmail.com',
        time      : new Date(),
        action    : 'New Session Proposal',
        subject   : 'New session proposal for Event5',
        message   : String.htmlSafe('Hi a@kk.com,<br/>The event <strong>HINT</strong> has received a new session proposal. <br/> Visit this link to view the session: http://localhost:5000/events/6/sessions/13/')
      }

    ];
  }
});
