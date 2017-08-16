import attr from 'ember-data/attr';
import ModelBase from 'open-event-frontend/models/base';
import moment from 'moment';
import { computedDateTimeSplit } from 'open-event-frontend/utils/computed-helpers';
import { belongsTo } from 'ember-data/relationships';

export default ModelBase.extend({
  name                 : attr('string'),
  type                 : attr('string'),
  price                : attr('number'),
  quantity             : attr('number', { defaultValue: 100 }),
  description          : attr('string'),
  isDescriptionVisible : attr('boolean', { defaultValue: true }),
  isHidden             : attr('boolean', { defaultValue: false }),
  salesStartsAt        : attr('moment', { defaultValue: () => moment().startOf('day') }),
  salesEndsAt          : attr('moment', { defaultValue: () => moment().add(10, 'days').startOf('day') }),
  minOrder             : attr('number', { defaultValue: 1 }),
  maxOrder             : attr('number', { defaultValue: 10 }),
  isFeeAbsorbed        : attr('boolean', { defaultValue: true }),
  position             : attr('number'),

  hasOrders: false,

  event : belongsTo('event'),
  order : belongsTo('order'),

  salesStartAtDate : computedDateTimeSplit.bind(this)('salesStartsAt', 'date'),
  salesStartAtTime : computedDateTimeSplit.bind(this)('salesStartsAt', 'time'),
  salesEndsAtDate  : computedDateTimeSplit.bind(this)('salesEndsAt', 'date'),
  salesEndsAtTime  : computedDateTimeSplit.bind(this)('salesEndsAt', 'date')
});
