import attr from 'ember-data/attr';
import moment from 'moment';
import ModelBase from 'open-event-frontend/models/base';
import { belongsTo, hasMany } from 'ember-data/relationships';
import { computedDateTimeSplit } from 'open-event-frontend/utils/computed-helpers';
import { computed } from '@ember/object';
import { stateColorMap } from 'open-event-frontend/utils/dictionary/sessions';
import { inject as service } from '@ember/service';

const detectedTimezone = moment.tz.guess();

export default class Session extends ModelBase.extend({
  authManager: service(),

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
  website       : attr('string'),
  twitter       : attr('string'),
  facebook      : attr('string'),
  github        : attr('string'),
  gitlab        : attr('string'),
  linkedin      : attr('string'),
  instagram     : attr('string'),
  slidesUrl     : attr('string'),
  videoUrl      : attr('string'),
  audioUrl      : attr('string'),
  signupUrl     : attr('string'),
  sendEmail     : attr('boolean'),
  averageRating : attr('number'),
  mastodon      : attr('string'),

  isLocked   : attr('boolean', { defaultValue: false }),
  isMailSent : attr('boolean', { defaultValue: false }),

  createdAt          : attr('string'),
  deletedAt          : attr('string'),
  submittedAt        : attr('moment', { defaultValue: () => moment.tz(detectedTimezone) }),
  lastModifiedAt     : attr('string'),
  favouriteCount     : attr('number'),
  complexFieldValues : attr(),
  sessionType        : belongsTo('session-type'),
  microlocation      : belongsTo('microlocation'),
  track              : belongsTo('track'),
  speakers           : hasMany('speaker'),
  feedbacks          : hasMany('feedback'),
  event              : belongsTo('event'), // temporary
  creator            : belongsTo('user'),
  favourite          : belongsTo('user-favourite-session', { inverse: 'session' }),
  favourites         : hasMany('user-favourite-session'),
  exhibitors         : hasMany('exhibitor'),
  speakerInvites     : hasMany('speaker-invite'),

  status: computed('state', 'deletedAt', function() {
    if (this.deletedAt !== null) {
      return 'deleted';
    } else {
      return this.state;
    }
  }),

  color: computed('status', function() {
    return stateColorMap[this.status];
  }),

  isFavourite: computed('favourite', function() {
    return this.belongsTo('favourite').value()?.get('user.id') === this.authManager.currentUser?.id;
  }),

  startAtDate : computedDateTimeSplit.bind(this)('startsAt', 'date', 'endsAt'),
  startAtTime : computedDateTimeSplit.bind(this)('startsAt', 'time', 'endsAt'),
  endsAtDate  : computedDateTimeSplit.bind(this)('endsAt', 'date'),
  endsAtTime  : computedDateTimeSplit.bind(this)('endsAt', 'time'),

  ready() {
    if (!this.complexFieldValues) {
      this.complexFieldValues = {};
    }
  }

}) {}
