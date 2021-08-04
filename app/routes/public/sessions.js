import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';
import moment from 'moment';

let isDateFilterActive = Boolean(new URLSearchParams(location.search).get('date'));

@classic
export default class SessionsRoute extends Route {
  queryParams = {
    date: {
      refreshModel: true
    },
    sort: {
      refreshModel: true
    },
    track: {
      refreshModel: true
    },
    room: {
      refreshModel: true
    },
    sessionType: {
      refreshModel: true
    },
    search: {
      refreshModel: true
    },
    my_speaker_sessions: {
      refreshModel: true
    },
    my_schedule: {
      refreshModel: true
    },
    level: {
      refreshModel: true
    }
  };

  titleToken() {
    return this.l10n.t('Sessions');
  }

  async beforeModel() {
    const event = this.modelFor('public');
    const dates = await this.loader.load('/events/' + event.id + '/sessions/dates');
    if (moment().isSameOrAfter(event.startsAt) && moment().isSameOrBefore(event.endsAt) && dates.includes(moment().format('YYYY-MM-DD')) && !isDateFilterActive) {
      isDateFilterActive = true;
      this.transitionTo('public.sessions', event.get('identifier'), { queryParams: { date: moment().format('YYYY-MM-DD') } });
    }
  }

  async model(params) {
    const eventDetails = this.modelFor('public');
    const filterOptions = [
      {
        and: [
          {
            or: [
              {
                name : 'state',
                op   : 'eq',
                val  : 'confirmed'
              },
              {
                name : 'state',
                op   : 'eq',
                val  : 'accepted'
              }
            ]
          }
        ]
      }
    ];

    if (params.date) {
      filterOptions.push({
        and: [
          {
            name : 'starts-at',
            op   : 'ge',
            val  : moment.tz(params.date, eventDetails.timezone).toISOString()
          },
          {
            name : 'starts-at',
            op   : 'le',
            val  : moment.tz(params.date, eventDetails.timezone).add(1, 'days').toISOString()
          }
        ]
      });
    }

    if (params.track) {
      const tracks = params.track.split(':');
      filterOptions.push({
        name : 'track',
        op   : 'has',
        val  : {
          or: tracks.map(val => ({
            name : 'name',
            op   : 'eq',
            val  : val.charAt(0) === ',' ? val.substring(1) : val
          }))
        }
      });
    }

    if (params.sessionType) {
      const sessions = params.sessionType.split(',');
      filterOptions.push({
        name : 'session-type',
        op   : 'has',
        val  : {
          or: sessions.map(val => ({
            name : 'name',
            op   : 'eq',
            val
          }))
        }
      });
    }

    if (params.level) {
      const levels = params.level.split(',');
      filterOptions.push({
        or: levels.map(val => ({
          name : 'level',
          op   : 'eq',
          val
        }))
      });
    }

    if (params.my_schedule) {
      filterOptions.push({
        name : 'favourites',
        op   : 'any',
        val  : {
          name : 'user',
          op   : 'has',
          val  : {
            name : 'id',
            op   : 'eq',
            val  : this.authManager.currentUser.id
          }
        }
      });
    }

    if (params.room) {
      const rooms = params.room.split(':');
      filterOptions.push({
        name : 'microlocation',
        op   : 'has',
        val  : {
          or: rooms.map(val => ({
            name : 'name',
            op   : 'eq',
            val  : val.charAt(0) === ',' ? val.substring(1) : val
          }))
        }
      });
    }

    if (params.search) {
      filterOptions.push({
        or: [
          {
            name : 'title',
            op   : 'ilike',
            val  : `%${params.search}%`
          },
          {
            name : 'track',
            op   : 'has',
            val  : {
              name : 'name',
              op   : 'ilike',
              val  : `%${params.search}%`
            }
          },
          {
            name : 'microlocation',
            op   : 'has',
            val  : {
              name : 'name',
              op   : 'ilike',
              val  : `%${params.search}%`
            }
          },
          {
            name : 'speakers',
            op   : 'any',
            val  : {
              name : 'name',
              op   : 'ilike',
              val  : `%${params.search}%`
            }
          }
        ]
      });
    }

    if (params.my_speaker_sessions) {
      filterOptions.push({
        name : 'speakers',
        op   : 'any',
        val  : {
          name : 'email',
          op   : 'eq',
          val  : this.authManager.currentUser.email
        }
      });
    }

    return {
      event   : eventDetails,
      session : await this.infinity.model('sessions', {
        include      : 'track,speakers,session-type,favourite,microlocation.video-stream',
        filter       : filterOptions,
        sort         : params.sort || 'starts-at',
        perPage      : 6,
        startingPage : 1,
        perPageParam : 'page[size]',
        pageParam    : 'page[number]',
        store        : eventDetails
      })
    };
  }
}
