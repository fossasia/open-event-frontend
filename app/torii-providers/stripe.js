import stripeConnect from 'torii/providers/stripe-connect';
import { alias } from '@ember/object/computed';
import { inject } from '@ember/service';
import { configurable } from 'torii/configuration';
import ENV from 'open-event-frontend/config/environment';

const isDebug = ENV.environment === 'development' || ENV.environment === 'test';
const clientId = isDebug && alias('settings.stripeTestClientId') ? alias('settings.stripeTestClientId') : alias('settings.stripeClientId');

export default stripeConnect.extend({
  settings: inject(),

  clientId,

  redirectUri: configurable('redirectUri', function() {
    return `${window.location.origin}/torii/redirect.html`;
  })
});
