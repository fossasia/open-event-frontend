import DS from 'ember-data';
import moment from 'moment';
import Fragment from 'ember-data-model-fragments/fragment';

const { attr } = DS;

export default Fragment.extend({
  announcement : attr('string'),
  startDate    : attr('string', { defaultValue: () => moment().startOf('day').toDate().format() }),
  endDate      : attr('string', { defaultValue: () => moment().add(1, 'months').startOf('day').toDate().format() }),
  timezone     : attr('string', { defaultValue: () => moment.tz.guess() }),
  privacy      : attr('string', { defaultValue: 'public' }),
  hash         : attr('string')
});
