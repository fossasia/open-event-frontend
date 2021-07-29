import { scheduleOnce } from '@ember/runloop';
import { inject as service } from '@ember/service';
import config from 'open-event-frontend/config/environment';
import RouterScroll from 'ember-router-scroll';

class Router extends RouterScroll {
  location = config.locationType;
  rootURL  = config.rootURL;
  @service metrics;
  @service session;
  @service headData;

  setTitle(title) {
    this.headData.set('title', title);
  }

  init() {
    super.init(...arguments);
    this.on('routeDidChange', () => {
      this._trackPage();
    });
  }

  _trackPage() {
    scheduleOnce('afterRender', this, () => {
      const page = this.url;
      const title = this.get('currentRouteName') ?? 'unknown';
      this.metrics.trackPage({ page, title });
      this.set('session.currentRouteName', title);
    });
  }
}

Router.map(function() {
  this.route('login');
  this.route('register');
  this.route('reset-password');
  this.route('attendee-app');
  this.route('organizer-app');
  this.route('logout');
  this.route('oauth', { path: '/oauth/callback' });
  this.route('public', { path: '/e/:event_id' }, function() {
    this.route('sessions-index', { path: '/sessions' });
    this.route('sessions', { path: '/schedule' }, function() {
      this.route('user', function() {
        this.route('view', { path: '/:user_id' });
      });
    });
    this.route('session', function() {
      this.route('view', { path: '/:session_id' }, function() {
        this.route('user', function() {
          this.route('view', { path: '/:user_id' });
        });
      });
    });
    this.route('stream', { path: '/video/:video_name' }, function() {
      this.route('view', { path: '/:stream_id' }, function() {
        this.route('chat');
      });
    });
    this.route('speaker', function() {
      this.route('view', { path: '/:speaker_id' });
    });
    this.route('cfs', { path: '/cfs/:speaker_call_hash' }, function() {
      this.route('new-speaker');
      this.route('new-session');
    });
    this.route('cfs', function() {
      this.route('new-speaker');
      this.route('new-session');
      this.route('view-speaker', { path: '/speaker/:speaker_id' });
      this.route('view-session', { path: '/session/:session_id' });
      this.route('edit-speaker', { path: '/speaker/:speaker_id/edit' });
      this.route('edit-session', { path: '/session/:session_id/edit' });
    });
    this.route('speaker-invite', function() {
      this.route('view-session', { path: '/:invite_id/session' });
    });
    this.route('schedule', { path: '/calendar' });
    this.route('coc');
    this.route('speakers');
    this.route('exhibition', function() {
      this.route('view', { path: '/:exhibitor_id' });
      this.route('video', { path: '/:exhibitor_id/video' });
    });
    this.route('chat');
  });
  this.route('role-invites');
  this.route('group-invites');
  this.route('pricing');
  this.route('create');
  this.route('not-found');
  this.route('pages', { path: '/*path' });
  this.route('events', function() {
    this.route('view', { path: '/:event_id' }, function() {
      this.route('edit', function() {
        this.route('basic-details');
        this.route('other-details');
        this.route('sponsors');
        this.route('sessions-speakers');
        this.route('attendee');
      });
      this.route('settings', function() {
        this.route('export');
        this.route('options');
      });
      this.route('sessions', function() {
        this.route('list', { path: '/:session_status' });
        this.route('create');
      });
      this.route('session', function() {
        this.route('view', { path: '/:session_id' });
        this.route('edit', { path: '/:session_id/edit' });
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
          this.route('edit', { path: '/:discount_code_id/edit' });
        });
        this.route('access-codes', function() {
          this.route('list', { path: '/:access_status' });
          this.route('create');
          this.route('edit', { path: '/:access_code_id/edit' });
        });
        this.route('order-form');
      });
      this.route('speakers', function() {
        this.route('list', { path: '/:speakers_status' });
        this.route('create');
        this.route('reorder');
      });
      this.route('speaker', function() {
        this.route('view', { path: '/:speaker_id' });
        this.route('edit', { path: '/:speaker_id/edit' });
      });
      this.route('documents');
      this.route('chat');
      this.route('videoroom', { path: '/video' }, function() {
        this.route('list', { path: '/:status' });
        this.route('edit', { path: '/:stream_id/edit' });
        this.route('create');
      });
      this.route('scheduler');
      this.route('team', function() {
        this.route('permissions');
      });
      this.route('exhibitors', function() {
        this.route('list');
        this.route('create');
        this.route('edit', { path: '/:exhibitor_id/edit' });
        this.route('reorder');
      });
    });
    this.route('list', { path: '/:event_state' });
    this.route('import');
  });
  this.route('account', function() {
    this.route('profile');
    this.route('password');
    this.route('email-preferences');
    this.route('applications');
    this.route('danger-zone');
    this.route('billing', function() {
      this.route('payment-info');
      this.route('invoices', function() {
        this.route('list', { path: '/:invoice_status' });
      });
    });
  });
  this.route('explore', function() {
    this.route('events');
    this.route('groups');
  });
  this.route('groups', function() {
    this.route('list');
    this.route('create');
    this.route('following');
    this.route('team', { path: '/team/:group_id' });
    this.route('view', { path: '/:group_id' });
    this.route('edit', { path: '/edit' }, function() {
      this.route('events', { path: '/:group_id/events' });
      this.route('settings', { path: '/:group_id/settings' });
      this.route('followers', { path: '/:group_id/followers' });
    });
  });
  this.route('my-tickets', function() {
    this.route('upcoming', function() {
      this.route('list', { path: '/:ticket_status' });
    });
    this.route('past');
  });
  this.route('my-sessions', function() {
    this.route('list', { path: '/:session_status' });
  });
  // this.route('notifications', function() {
  //   this.route('all', { path: '/:notification_state' });
  // });
  this.route('admin', function() {
    this.route('events', function() {
      this.route('list', { path: '/:events_status' });
      this.route('import');
    });
    this.route('sales', function() {
      this.route('index', { path: '/:event_status' });
      this.route('organizers');
      this.route('marketer');
      this.route('locations');
      this.route('invoices');
      this.route('revenue');
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
        this.route('account', function() {
          this.route('applications');
          this.route('profile');
          this.route('email-preferences');
        });
        this.route('tickets', function() {
          this.route('list', { path: '/:tickets_status' });
        });
      });
      this.route('list', { path: '/:users_status' });
    });
    this.route('video', function() {
      this.route('channels', function() {
        this.route('create');
        this.route('edit', { path: '/:videoChannel_id/edit' });
      });
      this.route('recordings');
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
      this.route('social-media');
      this.route('microlocations');
      this.route('microservices');
      this.route('images');
      this.route('analytics');
      this.route('payment-gateway');
      this.route('ticket-fees');
      this.route('billing');
      this.route('frontpage');
    });
    this.route('content', function() {
      this.route('social-links');
      this.route('pages');
      this.route('system-images', function() {
        this.route('list', { path: '/:topic_id' });
      });
      this.route('translations');
      this.route('events');
    });
    this.route('groups', function() {
      this.route('list', { path: '/:group_status' });
    });
  });
  this.route('orders', function() {
    this.route('new', { path: '/:order_id/new' });
    this.route('expired', { path: '/:order_id/expired' });
    this.route('view', { path: '/:order_id/view' });
    this.route('pending', { path: '/:order_id/pending' });
  });
  this.route('verify');

  this.route('event-invoice', function() {
    this.route('review', { path: '/:invoice_identifier/review' });
    this.route('paid', { path: '/:invoice_identifier/paid' });
  });
});

export default Router;
