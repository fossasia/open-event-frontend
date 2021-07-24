import JWT from 'ember-simple-auth-token/authenticators/jwt';
import { get } from '@ember/object';
import { assign } from '@ember/polyfills';
import { Promise } from 'rsvp';
import { isEmpty } from '@ember/utils';
import ENV from 'open-event-frontend/config/environment';
import { inject as service } from '@ember/service';

export default JWT.extend({
  init() {
    this._super(...arguments);
  },

  session: service(),

  handleAuthResponse(response, oldRefreshToken = null) {
    const token = get(response, this.tokenPropertyName);

    if (isEmpty(token)) {
      throw new Error('Token is empty. Please check your backend response.');
    }

    const tokenData = this.getTokenData(token);
    const expiresAt = get(tokenData, this.tokenExpireName);
    const tokenExpireData = {};

    tokenExpireData[this.tokenExpireName] = expiresAt;

    if (this.tokenExpirationInvalidateSession) {
      this.scheduleAccessTokenExpiration(expiresAt);
    }
    if (this.refreshAccessTokens) {
      let refreshToken = null;

      if (oldRefreshToken) {
        refreshToken = oldRefreshToken;
      } else {
        refreshToken = get(response, this.refreshTokenPropertyName);
      }

      if (isEmpty(refreshToken)) {
        throw new Error('Refresh token is empty. Please check your backend response.');
      }

      this.scheduleAccessTokenRefresh(expiresAt, refreshToken);
    }

    return assign(response, tokenExpireData, { tokenData });
  },

  refreshAccessToken(token) {
    this.headers[ENV['ember-simple-auth-token'].authorizationHeaderName] = ENV['ember-simple-auth-token'].authorizationPrefix + token;
    this.headers['X-CSRF-Token'] = this.session.data.authenticated.tokenData?.csrf;

    const data = this.makeRefreshData(token);
    return this.makeRequest(this.serverTokenRefreshEndpoint, data, this.headers).then(response => {
      const sessionData = this.handleAuthResponse(response.json, token);
      sessionData.refresh_token = token;
      this.trigger('sessionDataUpdated', sessionData);
      return sessionData;
    }).catch(error => {
      this.handleTokenRefreshFail(error.status);
      return Promise.reject(error);
    });
  }
});
