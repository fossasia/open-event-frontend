import Ember from 'ember';

const { Route, RSVP } = Ember;

export default Route.extend({
  titleToken() {
    return this.l10n.t('Explore');
  },
  queryParams: {
    category: {
      refreshModel: true
    },
    sub_category: {
      refreshModel: true
    },
    event_type: {
      refreshModel: true
    },
    date_range: {
      refreshModel: true
    }
  },

  model(params) {
    this.set('params', params);
    let filterOptions = [];

    if (params.category) {
      if (params.sub_category) {
        filterOptions.pushObject(
          {
            name : 'event-sub-topic',
            op   : 'any',
            val  : {
              name : 'name',
              op   : 'eq',
              val  : params.sub_category
            }
          }
        );
      }
      filterOptions.pushObject(
        {
          name : 'event-topic',
          op   : 'any',
          val  : {
            name : 'name',
            op   : 'eq',
            val  : params.category
          }
        }
      );
    }
    if (params.event_type) {
      filterOptions.pushObject(
        {
          name : 'event-type',
          op   : 'any',
          val  : {
            name : 'name',
            op   : 'eq',
            val  : params.event_type
          }
        }
      );
    }
    return RSVP.hash({
      events: this.store.query('event', {
        sort   : 'starts-at',
        filter : filterOptions
      }),
      eventTypes  : this.store.findAll('event-type'),
      eventTopics : this.store.findAll('event-topic', { include: 'event-sub-topics' })
    });
  }
});
