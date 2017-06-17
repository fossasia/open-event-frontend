import Ember from 'ember';

const { Route } = Ember;

export default Route.extend({
  titleToken() {
    return this.i18n.t('Activity Logs');
  },

  model() {
    return [
      {
        actor  : 'sample@gmail.com',
        time   : new Date(),
        action : 'User "sample@gmail.com" (1) login from IP 10.28.0.1 using browser chrome on macos platform'
      },

      {
        actor  : 'sample@gmail.com',
        time   : new Date(),
        action : 'Event Sample 1 created'
      },

      {
        actor  : 'sample2@gmail.com',
        time   : new Date(),
        action : 'Speaker sample speaker (1) of event 1 updated'
      },

      {
        actor  : 'sample@gmail.com',
        time   : new Date(),
        action : 'User "sample4@gmail.com" (1) login from IP 100.68.0.1 using browser firefox on linux platform'
      },

      {
        actor  : 'sample@gmail.com',
        time   : new Date(),
        action : 'Event Sample1 deleted'
      }

    ];
  }
});
