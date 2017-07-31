import attr from 'ember-data/attr';
import ModelBase from 'open-event-frontend/models/base';
import { belongsTo } from 'ember-data/relationships';
import { v4 } from 'ember-uuid';
import Ember from 'ember';
import { computedDateTimeSplit } from 'open-event-frontend/utils/computed-helpers';
import moment from 'moment';

const { computed } = Ember;

export default ModelBase.extend({
  announcement : attr('string'),
  startsAt     : attr('moment'),
  endsAt       : attr('moment'),
  privacy      : attr('string', { defaultValue: 'public' }),
  hash         : attr('string', { defaultValue: v4() }),

  event: belongsTo('event'),

  startsAtDate : computedDateTimeSplit.bind(this)('startsAt', 'date'),
  startsAtTime : computedDateTimeSplit.bind(this)('startsAt', 'time'),
  endsAtDate   : computedDateTimeSplit.bind(this)('endsAt', 'date'),
  endsAtTime   : computedDateTimeSplit.bind(this)('endsAt', 'date'),

  isOpen: computed('startsAt', 'endsAt', function() {
    return moment().isAfter(this.get('startsAt')) && moment().isBefore(this.get('endsAt'));
  }),

  isInFuture: computed('startsAt', function() {
    return moment(this.get('startsAt')).isAfter();
  })
});
