import Ember from 'ember';
import moment from 'moment';

const { Route } = Ember;

export default Route.extend({
  model() {
    return this.store.query('event', {
      include : 'event_topic,event_sub_topic,event_type',
      filter  : [
        {
          name : 'starts_at',
          op   : 'ge',
          val  : moment().toISOString()
        },
        {
          name : 'state',
          op   : 'eq',
          val  : 'Published'
        }
      ]
    });
  }
});
