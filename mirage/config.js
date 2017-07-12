import ENV from 'open-event-frontend/config/environment';

export default function() {
  this.passthrough();
  this.passthrough(`${ENV.APP.apiHost}/**`);
  this.passthrough(`${ENV.sentry.server}/**`);
}
