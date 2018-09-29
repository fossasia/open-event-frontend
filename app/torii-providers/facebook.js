import facebookConnect from 'torii/providers/facebook-oauth2';
import { inject } from '@ember/service';
import { configurable } from 'torii/configuration';
import { alias } from '@ember/object/computed';

export default facebookConnect.extend({
  settings: inject(),

  clientId: alias('settings.fbClientId'),

  redirectUri: configurable('redirectUri', function() {
    return `${window.location.origin}/torii/redirect.html`;
  })
});
