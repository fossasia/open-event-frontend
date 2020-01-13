import stripeConnect from 'torii/providers/stripe-connect';
import { alias } from '@ember/object/computed';
import { inject } from '@ember/service';
import { configurable } from 'torii/configuration';
import ENV from 'open-event-frontend/config/environment';

export default stripeConnect.extend({
  settings: inject(),

  clientId: ENV.environment === 'development' || ENV.environment === 'test' ? alias('settings.stripeTestClientId') : alias('settings.stripeClientId'),

  redirectUri: configurable('redirectUri', function() {
    return `${window.location.origin}/torii/redirect.html`;
  })
});
