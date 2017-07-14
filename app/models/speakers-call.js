import attr from 'ember-data/attr';
import Model from 'ember-data/model';
import { belongsTo } from 'ember-data/relationships';
import { v4 } from 'ember-uuid';
import { computedDateTimeSplit } from 'open-event-frontend/utils/computed-helpers';

export default Model.extend({
  announcement : attr('string'),
  startsAt     : attr('moment'),
  endsAt       : attr('moment'),
  privacy      : attr('string', { defaultValue: 'public' }),
  hash         : attr('string', { defaultValue: v4() }),

  event: belongsTo('event'),

  startsAtDate : computedDateTimeSplit.bind(this)('startsAt', 'date'),
  startsAtTime : computedDateTimeSplit.bind(this)('startsAt', 'time'),
  endsAtDate   : computedDateTimeSplit.bind(this)('endsAt', 'date'),
  endsAtTime   : computedDateTimeSplit.bind(this)('endsAt', 'date')
});
