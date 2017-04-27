import DS from 'ember-data';
import moment from 'moment';
import Fragment from 'ember-data-model-fragments/fragment';

const { attr } = DS;

export default Fragment.extend({
  announcement  : attr('string'),
  startDateTime : attr('date', { defaultValue: () => moment().startOf('day').toDate() }),
  endDateTime   : attr('date', { defaultValue: () => moment().add(1, 'months').startOf('day').toDate() }),
  timezone      : attr('string', { defaultValue: () => moment.tz.guess() }),
  privacy       : attr('string', { defaultValue: 'public' }),
  hash          : attr('string')
});
