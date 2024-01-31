import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import Route from '@ember/routing/route';
import moment from 'moment-timezone';
import { hash } from 'rsvp';

@classic
export default class IndexRoute extends Route {

  beforeModel(transition) {
    super.beforeModel(transition);
    if (this.authManager.currentUser?.languagePrefrence && this.session.currentRouteName === 'login') {
      this.l10n.switchLanguage(this.authManager.currentUser.languagePrefrence);
    }
  }

  /**
   * Load filtered events based on the given params
   *
   * @param params
   * @param mode
   * @return {*}
   * @private
   */
  _loadEvents(mode, featured) {
    const filterOptions = [
      {
        and:
        [
          {
            name : 'state',
            op   : 'eq',
            val  : 'published'
          },
          {
            name : 'privacy',
            op   : 'eq',
            val  : 'public'
          }
        ]
      }
    ];

    const dateFilters = [
      {
        name : 'ends-at',
        op   : 'ge',
        val  : moment().toISOString()
      }
    ];

    if (!featured) {
      dateFilters.push({
        name : 'starts-at',
        op   : 'ge',
        val  : moment().toISOString()
      });
    }

    filterOptions.push({
      or: dateFilters
    });

    if (mode === 'filterOptions') {
      return filterOptions;
    } else {
      return this.store.query('event', {
        sort    : 'starts-at',
        include : 'event-topic,event-sub-topic,event-type,speakers-call',
        filter  : filterOptions
      });
    }

  }

  async model() {

    const promotedGroupFilter = [
      {
        name : 'is-promoted',
        op   : 'eq',
        val  : true
      }
    ];

    let popularGroup = [];
    try {
      popularGroup = this.store.query('group', {
        include      : 'user,follower',
        'page[size]' : 12,
        filter       : promotedGroupFilter,
        public       : true,
        cache        : true
      });
    } catch (error) {
      popularGroup = [];
      console.warn(error);
    }

    const featuredOptions =  this._loadEvents('filterOptions', true);
    featuredOptions[0].and.push({
      name : 'is-featured',
      op   : 'eq',
      val  : true
    });

    const upcomingEventsFilter = [
      {
        or: [
          {
            name : 'is-featured',
            op   : 'eq',
            val  : true
          },
          {
            name : 'is-promoted',
            op   : 'eq',
            val  : true
          },
          {
            and: [
              {
                name : 'logo-url',
                op   : 'ne',
                val  : null
              },
              {
                name : 'original-image-url',
                op   : 'ne',
                val  : null
              },
              {
                name : 'event-topic',
                op   : 'ne',
                val  : null
              },
              {
                name : 'event-sub-topic',
                op   : 'ne',
                val  : null
              },
              {
                name : 'event-type',
                op   : 'ne',
                val  : null
              }
            ]
          }
        ]
      }
    ];

    const callForSpeakersFilter = this._loadEvents('filterOptions');
    callForSpeakersFilter[0].and = [
      ...callForSpeakersFilter[0].and,
      ...upcomingEventsFilter,
      {
        name : 'is-sessions-speakers-enabled',
        op   : 'eq',
        val  : true
      },
      {
        name : 'is-demoted',
        op   : 'eq',
        val  : false
      },
      {
        name : 'speakers-call',
        op   : 'has',
        val  : {
          name : 'privacy',
          op   : 'eq',
          val  : 'public'
        }
      },
      {
        name : 'speakers-call',
        op   : 'has',
        val  : {
          name : 'starts-at',
          op   : 'le',
          val  : moment().toISOString()
        }
      },
      {
        name : 'speakers-call',
        op   : 'has',
        val  : {
          name : 'ends-at',
          op   : 'ge',
          val  : moment().toISOString()
        }
      },
      {
        name : 'speakers-call',
        op   : 'has',
        val  : {
          name : 'announcement',
          op   : 'ne',
          val  : null
        }
      }
    ];


    return hash({
      filteredEvents: this.store.query('event', {
        upcoming     : true,
        include      : 'event-topic,event-sub-topic,event-type,speakers-call',
        cache        : true,
        public       : true,
        'page[size]' : 12
      }),
      featuredEvents: this.store.query('event', {
        sort         : 'starts-at',
        include      : 'event-topic,event-sub-topic,event-type,speakers-call',
        filter       : featuredOptions,
        cache        : true,
        public       : true,
        'page[size]' : 6
      }),
      callForSpeakersEvents: this.store.query('event', {
        sort         : 'starts-at',
        include      : 'event-topic,event-sub-topic,event-type,speakers-call',
        filter       : callForSpeakersFilter,
        cache        : true,
        public       : true,
        'page[size]' : 6
      }),
      promotedGroup  : popularGroup,
      followedGroups : this.authManager.currentUser?.email ? this.authManager.currentUser.query('followedGroups', {
        include: 'group,user'
      }) : []
    });

  }

  async afterModel() {
    const prevRoute = this.session.currentRouteName;
    setTimeout(() => {
      if (this.session.isAuthenticated && this.session.currentRouteName === 'index' && prevRoute === 'login' && !this.authManager.currentUser.publicName) {
        try {
          this.confirm.prompt(this.l10n.t('You have not set a Public Profile Name yet. A public name is displayed on user profiles and video sessions instead of a fantasy name. You can change it later on your account page. Please set your public name now.'), { 'publicName': true });
        } catch {
          console.warn('User public profile name not set.');
        }
      }
    }, 2000);
  }

  setupController(controller, model) {
    super.setupController(...arguments);
    controller.set('filteredEvents', model.filteredEvents);
    controller.set('featuredEvents', model.featuredEvents);
    this.set('controller', controller);
  }

  @action
  loading(transition) {
    transition.promise.finally(() => {
      if (this.controller) {
        this.controller.set('finishedLoading', true);
      }
    });
    return false;
  }
}
