import * as Sentry from '@sentry/browser';
import { Ember } from '@sentry/integrations';
import config from 'open-event-frontend/config/environment';

Sentry.init({
  integrations: [new Ember()],
  beforeSend(event: Sentry.Event) {
    const exception = event.exception?.values?.[0];
    const errorValue = exception?.value;
    if (errorValue?.includes('Ember Data Request')
            && errorValue?.includes('404')) {
      // Ignore 404 errors from Ember Data because
      // I don't know how to turn them off
      return null;
    }

    if (errorValue?.includes('TransitionAborted')
            && exception?.mechanism?.handled) {
      // Every page load has a handled TransitionAborted for some reason
      return null;
    }

    return event;
  },
  ...config.sentry
});
