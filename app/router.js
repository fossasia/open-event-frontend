import Ember from 'ember';
import config from 'open-event-frontend/config/environment';

const { Router, run: { scheduleOnce }, inject: { service } } = Ember;

const router = Router.extend({
  location : config.locationType,
  rootURL  : config.rootURL,
  metrics  : service(),
  session  : service(),

  didTransition() {
    this._super(...arguments);
    this._trackPage();
  },

  _trackPage() {
    scheduleOnce('afterRender', this, () => {
      const page = this.get('url');
      const title = this.getWithDefault('currentRouteName', 'unknown');
      this.get('metrics').trackPage({ page, title });
      this.set('session.currentRouteName', title);
    });
  }
});

router.map(function() {
  this.route('login');
  this.route('register');
  this.route('forgot-password');
  this.route('logout');
  this.route('public', { path: '/e/:event_id' }, function() {
    this.route('sessions');
    this.route('cfs');
    this.route('schedule');
  });
  this.route('create');
  this.route('not-found');
  this.route('not-found-catch', { path: '/*path' });
  this.route('events', function() {
    this.route('view', { path: '/:event_id' }, function() {
      this.route('edit', function() {
        this.route('basic-details');
        this.route('sponsors');
        this.route('sessions-speakers');
      });
      this.route('export');
      this.route('sessions', function() {
        this.route('list', { path: '/:session_status' });
      });
      this.route('tickets', function() {
        this.route('orders');
        this.route('attendees');
        this.route('add-order');
        this.route('discount-codes');
        this.route('access-codes', function() {
          this.route('list', { path: '/:access_status' });
          this.route('create');
        });
      });
      this.route('speakers', function() {
        this.route('list', { path: '/:speakers_status' });
      });
    });
    this.route('list', { path: '/:event_state' });
    this.route('import');
  });
  this.route('profile');

  this.route('settings', function() {
    this.route('contact-info');
    this.route('password');
    this.route('email-preferences');
    this.route('applications');
  });
  this.route('explore');
  this.route('my-tickets', function() {
    this.route('saved');
    this.route('past');
  });
  this.route('notifications', function() {
    this.route('all');
  });
  this.route('admin', function() {
    this.route('events', function() {
      this.route('list', { path: '/:events_status' });
      this.route('import');
    });
    this.route('sales', function() {
      this.route('organizers');
      this.route('marketer');
      this.route('locations');
      this.route('fees');
      this.route('status');
      this.route('discounted-events');
    });
    this.route('sessions',  function() {
      this.route('list', { path: '/:sessions_state' });
    });
    this.route('users', function() {
      this.route('list', { path: '/:users_status' });
    });
    this.route('permissions', function() {
      this.route('event-roles');
      this.route('system-roles');
    });
    this.route('reports', function() {
      this.route('kubernetes-server-logs');
      this.route('system-logs', function() {
        this.route('activity-logs');
        this.route('mail-logs');
        this.route('notification-logs');
      });
    });
    this.route('messages');
    this.route('settings', function() {
      this.route('microlocations');
      this.route('microservices');
      this.route('images');
      this.route('analytics');
      this.route('payment-gateway');
      this.route('ticket-fees');
    });
    this.route('modules');
    this.route('content', function() {
      this.route('social-links');
      this.route('pages');
      this.route('system-images');
      this.route('translations');
    });
  });
  this.route('orders', function() {
    this.route('new');
  });
});

export default router;
