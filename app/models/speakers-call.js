import attr from 'ember-data/attr';
import Model from 'ember-data/model';
import { belongsTo } from 'ember-data/relationships';
import { v4 } from 'ember-uuid';
import { computedDateTimeSplit } from 'open-event-frontend/utils/computed-helpers';

export default Model.extend({
  announcement : attr('string'),
  startsAt     : attr('date'),
  endsAt       : attr('date'),
  privacy      : attr('string', { defaultValue: 'public' }),
  hash         : attr('string', { defaultValue: v4() }),

  event: belongsTo('event'),

  startAtDate : computedDateTimeSplit.bind(this)('startsAt', 'date'),
  startAtTime : computedDateTimeSplit.bind(this)('startsAt', 'time'),
  endsAtDate  : computedDateTimeSplit.bind(this)('endsAt', 'date'),
  endsAtTime  : computedDateTimeSplit.bind(this)('endsAt', 'date')
});
