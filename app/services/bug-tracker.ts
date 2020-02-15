import Service from '@ember/service';
import * as Sentry from '@sentry/browser';

export default class BugTracker extends Service {
  
  setUser(user: Sentry.User | null) {
    Sentry.setUser(user)
  }

  clearUser() {
    Sentry.setUser(null);
  }

}

// DO NOT DELETE: this is how TypeScript knows how to look up your services.
declare module '@ember/service' {
  interface Registry {
    'bug-tracker': BugTracker;
  }
}
