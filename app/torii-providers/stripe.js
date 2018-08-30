import stripeConnect from 'torii/providers/stripe-connect';
import { alias } from '@ember/object/computed';
import { inject } from '@ember/service';
import { configurable } from 'torii/configuration';

export default stripeConnect.extend({
  settings: inject(),

  clientId: alias('settings.stripeClientId'),

  redirectUri: configurable('redirectUri', function() {
    return `${window.location.origin}/torii/redirect.html`;
  })
});
