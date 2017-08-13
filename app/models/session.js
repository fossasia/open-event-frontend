import attr from 'ember-data/attr';
import ModelBase from 'open-event-frontend/models/base';
import { belongsTo, hasMany } from 'ember-data/relationships';
import { computedDateTimeSplit } from 'open-event-frontend/utils/computed-helpers';

export default ModelBase.extend({
  title         : attr('string'),
  subtitle      : attr('string'),
  startsAt      : attr('moment'),
  endsAt        : attr('moment'),
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
  submittedAt : attr('string'),

  sessionType   : belongsTo('session-type'),
  microlocation : belongsTo('microlocation'),
  track         : belongsTo('track'),
  speakers      : hasMany('speaker'),
  event         : belongsTo('event'), // temporary
  user          : belongsTo('user'),

  startAtDate : computedDateTimeSplit.bind(this)('startsAt', 'date'),
  startAtTime : computedDateTimeSplit.bind(this)('startsAt', 'time'),
  endsAtDate  : computedDateTimeSplit.bind(this)('endsAt', 'date'),
  endsAtTime  : computedDateTimeSplit.bind(this)('endsAt', 'date')
});
