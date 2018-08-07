import Router from '@ember/routing/router';
import { scheduleOnce } from '@ember/runloop';
import { inject as service } from '@ember/service';
import config from 'open-event-frontend/config/environment';
import RouterScroll from 'ember-router-scroll';

const router = Router.extend(RouterScroll, {
  location : config.locationType,
  rootURL  : config.rootURL,
  metrics  : service(),
  session  : service(),
  headData : service(),

  didTransition() {
    this._super(...arguments);
    this._trackPage();
  },

  setTitle(title) {
    this.get('headData').set('title', title);
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
  this.route('reset-password');
  this.route('logout');
  this.route('public', { path: '/e/:event_id' }, function() {
    this.route('sessions', function() {
      this.route('list', { path: '/s/:session_status' });
    });
    this.route('cfs', { path: '/cfs/:speaker_call_hash' }, function() {
      this.route('new-speaker');
      this.route('new-session');
    });
    this.route('cfs', function() {
      this.route('new-speaker');
      this.route('new-session');
      this.route('edit-speaker', { path: '/edit/:speaker_id' });
      this.route('edit-session', { path: '/edit/:session_id' });
    });
    this.route('schedule');
    this.route('coc');
    this.route('speakers');
  });
  this.route('create');
  this.route('not-found');
  this.route('pages', { path: '/*path' });
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
        this.route('create');
        this.route('edit', { path: '/edit/:session_id' });
      });
      this.route('tickets', function() {
        this.route('orders', function() {
          this.route('list', { path: '/:orders_status' });
        });
        this.route('attendees', function() {
          this.route('list', { path: '/:attendees_status' });
        });
        this.route('add-order');
        this.route('discount-codes', function() {
          this.route('list', { path: '/:discount_status' });
          this.route('create');
          this.route('edit', { path: '/edit/:discount_code_id' });
        });
        this.route('access-codes', function() {
          this.route('list', { path: '/:access_status' });
          this.route('create');
          this.route('edit', { path: '/edit/:access_code_id' });
        });
        this.route('order-form');
      });
      this.route('speakers', function() {
        this.route('list', { path: '/:speakers_status' });
        this.route('edit', { path: '/edit/:speaker_id' });
        this.route('create');
      });
      this.route('scheduler');
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
    this.route('list', { path: '/:ticket_status' });
  });
  this.route('my-sessions', function() {
    this.route('list', { path: '/:session_status' });
    this.route('view', { path: '/s/:session_id' });
  });
  this.route('notifications', function() {
    this.route('all');
  });
  this.route('admin', function() {
    this.route('messages', function() {
      this.route('list');
    });
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
      this.route('view', { path: '/:user_id' }, function() {
        this.route('sessions', function() {
          this.route('list', { path: '/:session_status' });
        });
        this.route('events', function() {
          this.route('list', { path: '/:event_status' });
        });
        this.route('settings', function() {
          this.route('applications');
          this.route('contact-info');
          this.route('email-preferences');
        });
        this.route('tickets', function() {
          this.route('list', { path: '/:tickets_status' });
        });
      });
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
      this.route('system-images', function() {
        this.route('list', { path: '/:topic_id' });
      });
      this.route('translations');
      this.route('events');
    });
  });
  this.route('orders', function() {
    this.route('new', { path: '/:order_id/new' });
    this.route('expired', { path: '/:order_id/expired' });
    this.route('view', { path: '/:order_id/view' });
    this.route('placed', { path: '/:order_id/placed' });
  });
  this.route('verify');
});

export default router;
