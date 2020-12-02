import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';
import moment from 'moment';

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
    search: {
      refreshModel: true
    }
  };

  titleToken() {
    return this.l10n.t('Sessions');
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
      filterOptions.push({
        name : 'track',
        op   : 'has',
        val  : {
          name : 'name',
          op   : 'eq',
          val  : params.track
        }
      });
    }

    if (params.room) {
      filterOptions.push({
        name : 'microlocation',
        op   : 'has',
        val  : {
          name : 'name',
          op   : 'eq',
          val  : params.room
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

    return {
      event   : eventDetails,
      session : await this.infinity.model('sessions', {
        include      : 'track,speakers,session-type,microlocation.video-stream',
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
