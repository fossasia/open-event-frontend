import attr from 'ember-data/attr';
import moment from 'moment';
import ModelBase from 'open-event-frontend/models/base';
import { belongsTo, hasMany } from 'ember-data/relationships';
import { computedDateTimeSplit } from 'open-event-frontend/utils/computed-helpers';

const detectedTimezone = moment.tz.guess();

export default ModelBase.extend({
  title         : attr('string'),
  subtitle      : attr('string'),
  startsAt      : attr('moment', { defaultValue: () => moment.tz(detectedTimezone).add(1, 'months').startOf('day') }),
  endsAt        : attr('moment', { defaultValue: () => moment.tz(detectedTimezone).add(1, 'months').hour(17).minute(0) }),
  shortAbstract : attr('string'),
  longAbstract  : attr('string'),
  language      : attr('string'),
  level         : attr('string'),
  comments      : attr('string'),
  state         : attr('string'),
  slidesUrl     : attr('string'),
  videoUrl      : attr('string'),
  audioUrl      : attr('string'),
  signupUrl     : attr('string'),

  isMailSent: attr('boolean', { defaultValue: false }),

  createdAt   : attr('string'),
  deletedAt   : attr('string'),
  submittedAt : attr('string', { defaultValue: () => moment() }),

  sessionType   : belongsTo('session-type'),
  microlocation : belongsTo('microlocation'),
  track         : belongsTo('track'),
  speakers      : hasMany('speaker'),
  event         : belongsTo('event'), // temporary
  user          : belongsTo('user'),

  startAtDate : computedDateTimeSplit.bind(this)('startsAt', 'date'),
  startAtTime : computedDateTimeSplit.bind(this)('startsAt', 'time'),
  endsAtDate  : computedDateTimeSplit.bind(this)('endsAt', 'date'),
  endsAtTime  : computedDateTimeSplit.bind(this)('endsAt', 'time')
});
