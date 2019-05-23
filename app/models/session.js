import attr from 'ember-data/attr';
import moment from 'moment';
import ModelBase from 'open-event-frontend/models/base';
import { belongsTo, hasMany } from 'ember-data/relationships';
import { computedDateTimeSplit } from 'open-event-frontend/utils/computed-helpers';
import { computed } from '@ember/object';


export default ModelBase.extend({
  title         : attr('string'),
  subtitle      : attr('string'),
  startsAt      : attr('moment', { defaultValue: () => null }),
  endsAt        : attr('moment', { defaultValue: () => null }),
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
  sendEmail     : attr('boolean'),

  isLocked   : attr('boolean', { defaultValue: false }),
  isMailSent : attr('boolean', { defaultValue: false }),

  createdAt      : attr('string'),
  deletedAt      : attr('string'),
  submittedAt    : attr('string', { defaultValue: () => moment() }),
  lastModifiedAt : attr('string'),
  sessionType    : belongsTo('session-type'),
  microlocation  : belongsTo('microlocation'),
  track          : belongsTo('track'),
  speakers       : hasMany('speaker'),
  event          : belongsTo('event'), // temporary
  creator        : belongsTo('user'),

  status: computed('state', 'deletedAt', function() {
    if (this.deletedAt !== null) {
      return 'deleted';
    } else {
      return this.state;
    }
  }),

  startAtDate : computedDateTimeSplit.bind(this)('startsAt', 'date'),
  startAtTime : computedDateTimeSplit.bind(this)('startsAt', 'time'),
  endsAtDate  : computedDateTimeSplit.bind(this)('endsAt', 'date'),
  endsAtTime  : computedDateTimeSplit.bind(this)('endsAt', 'time')
});
