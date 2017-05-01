import DS from 'ember-data';
import moment from 'moment';
import Fragment from 'ember-data-model-fragments/fragment';
import { v4 } from 'ember-uuid';

const { attr } = DS;

export default Fragment.extend({
  announcement : attr('string'),
  startDate    : attr('string'),
  endDate      : attr('string'),
  timezone     : attr('string', { defaultValue: () => moment.tz.guess() }),
  privacy      : attr('string', { defaultValue: 'public' }),
  hash         : attr('string', { defaultValue: v4() }),

  startTime : '',
  endTime   : ''
});
