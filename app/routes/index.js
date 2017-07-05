import Ember from 'ember';
import moment from 'moment';

const { Route } = Ember;

export default Route.extend({
  model() {
    return this.store.query('event', {
      include : 'event-topic,event-sub-topic,event-type,speakers-call',
      filter  : [
        {
          name : 'starts-at',
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
