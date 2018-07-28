import stripeConnect from 'torii/providers/stripe-connect';
import { alias } from '@ember/object/computed';
import { inject } from '@ember/service';
import { configurable } from 'torii/configuration';

export default stripeConnect.extend({
  settings: inject(),

  clientId: alias('settings.stripeClientId'),

  redirectUri: configurable('redirectUri', function() {
    let { pathname } = window.location;
    pathname = pathname.substr(0, pathname.lastIndexOf('/'));
    return `${window.location.origin}${pathname}/torii/redirect.html`;
  })
});
