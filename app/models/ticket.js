import attr from 'ember-data/attr';
import Model from 'ember-data/model';
import moment from 'moment';
import { computedDateTimeSplit } from 'open-event-frontend/utils/computed-helpers';
import { belongsTo } from 'ember-data/relationships';

export default Model.extend({
  name                 : attr('string'),
  type                 : attr('string'),
  price                : attr('number'),
  quantity             : attr('number', { defaultValue: 100 }),
  description          : attr('string'),
  isDescriptionVisible : attr('boolean', { defaultValue: true }),
  isHidden             : attr('boolean', { defaultValue: false }),
  salesStartsAt        : attr('date', { defaultValue: () => moment().startOf('day').toDate() }),
  salesEndsAt          : attr('date', { defaultValue: () => moment().add(10, 'days').startOf('day').toDate() }),
  minOrder             : attr('number', { defaultValue: 1 }),
  maxOrder             : attr('number', { defaultValue: 10 }),
  isFeeAbsorbed        : attr('boolean', { defaultValue: true }),
  position             : attr('number'),

  hasOrders: false,

  event: belongsTo('event'),

  salesStartAtDate : computedDateTimeSplit.bind(this)('salesStartsAt', 'date'),
  salesStartAtTime : computedDateTimeSplit.bind(this)('salesStartsAt', 'time'),
  salesEndsAtDate  : computedDateTimeSplit.bind(this)('salesEndsAt', 'date'),
  salesEndsAtTime  : computedDateTimeSplit.bind(this)('salesEndsAt', 'date')
});
