import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import moment from 'moment';
import attr from 'ember-data/attr';
import ModelBase from 'open-event-frontend/models/base';
import { hasMany, belongsTo } from 'ember-data/relationships';
import { computedDateTimeSplit } from 'open-event-frontend/utils/computed-helpers';
import CustomPrimaryKeyMixin from 'open-event-frontend/mixins/custom-primary-key';
import { groupBy } from 'lodash-es';

const detectedTimezone = moment.tz.guess();

export default class Event extends ModelBase.extend(CustomPrimaryKeyMixin, {

  /**
   * Service Injection
   */

  router   : service(),
  fastboot : service(),

  /**
   * Attributes
   */

  identifier             : attr('string', { readOnly: true }),
  name                   : attr('string'),
  description            : attr('string'),
  afterOrderMessage      : attr('string'),
  startsAt               : attr('moment', { defaultValue: () => moment.tz(detectedTimezone).add(1, 'months').startOf('day') }),
  endsAt                 : attr('moment', { defaultValue: () => moment.tz(detectedTimezone).add(1, 'months').hour(17).minute(0) }),
  timezone               : attr('string', { defaultValue: detectedTimezone }),
  locationName           : attr('string'),
  searchableLocationName : attr('string'),

  longitude : attr('number', { defaultValue: 0.0 }),
  latitude  : attr('number', { defaultValue: 0.0 }),

  logoUrl           : attr('string'),
  thumbnailImageUrl : attr('string', { readOnly: true }),
  largeImageUrl     : attr('string', { readOnly: true }),
  originalImageUrl  : attr('string'),
  iconImageUrl      : attr('string', { readOnly: true }),

  isMapShown                : attr('boolean', { defaultValue: true }),
  isSponsorsEnabled         : attr('boolean', { defaultValue: false }),
  isTicketFormEnabled       : attr('boolean', { defaultValue: false }),
  isCfsEnabled              : attr('boolean', { defaultValue: false }),
  isVideoroomEnabled        : attr('boolean', { defaultValue: false }),
  isSessionsSpeakersEnabled : attr('boolean', { defaultValue: false }),
  isFeatured                : attr('boolean', { defaultValue: false }),
  isPromoted                : attr('boolean', { defaultValue: false }),
  isDemoted                 : attr('boolean', { defaultValue: false }),
  isChatEnabled             : attr('boolean', { defaultValue: false }),
  isBillingInfoMandatory    : attr('boolean', { defaultValue: false }),
  isDocumentEnabled         : attr('boolean', { defaultValue: false }),
  isAnnounced               : attr('boolean', { defaultValue: false }),

  isTaxEnabled    : attr('boolean', { defaultValue: false }),
  canPayByPaypal  : attr('boolean', { defaultValue: false }),
  canPayByPaytm   : attr('boolean', { defaultValue: false }),
  canPayByStripe  : attr('boolean', { defaultValue: false }),
  isStripeLinked  : attr('boolean'),
  canPayByCheque  : attr('boolean', { defaultValue: false }),
  canPayByBank    : attr('boolean', { defaultValue: false }),
  canPayByOmise   : attr('boolean', { defaultValue: false }),
  canPayByAlipay  : attr('boolean', { defaultValue: false }),
  canPayOnsite    : attr('boolean', { defaultValue: false }),
  paymentCountry  : attr('string'),
  paymentCurrency : attr('string', { defaultValue: 'USD' }),
  paypalEmail     : attr('string'),
  chequeDetails   : attr('string'),
  bankDetails     : attr('string'),
  onsiteDetails   : attr('string'),
  refundPolicy    : attr('string'),


  schedulePublishedOn: attr('moment', { defaultValue: () => moment(0) }),

  hasOwnerInfo: attr('boolean',  { defaultValue: false }),

  ownerName        : attr('string'),
  ownerDescription : attr('string'),

  externalEventUrl : attr('string'),
  ticketUrl        : attr('string'),
  codeOfConduct    : attr('string'),

  state   : attr('string', { defaultValue: 'draft' }),
  privacy : attr('string', { defaultValue: 'public' }),

  pentabarfUrl : attr('string', { readOnly: true }),
  xcalUrl      : attr('string', { readOnly: true }),
  icalUrl      : attr('string', { readOnly: true }),

  online: attr('boolean', { defaultValue: false }),

  chatRoomName: attr('string'),

  createdAt     : attr('moment', { readOnly: true }),
  deletedAt     : attr('moment'),
  documentLinks : attr(),

  /**
   * Relationships
   */
  type                : belongsTo('event-type'),
  topic               : belongsTo('event-topic'),
  group               : belongsTo('group', { inverse: null }),
  subTopic            : belongsTo('event-sub-topic'),
  location            : belongsTo('event-location'),
  sessions            : hasMany('session'),
  sponsors            : hasMany('sponsor'),
  exhibitors          : hasMany('exhibitor'),
  microlocations      : hasMany('microlocation'),
  tracks              : hasMany('track'),
  tickets             : hasMany('ticket'),
  orders              : hasMany('order'),
  socialLinks         : hasMany('social-link'),
  emailNotifications  : hasMany('email-notification'),
  speakers            : hasMany('speaker'),
  invoice             : hasMany('event-invoice'),
  speakersCall        : belongsTo('speakers-call'),
  stripeAuthorization : belongsTo('stripe-authorization'),
  generalStatistics   : belongsTo('event-statistics-general'),
  tax                 : belongsTo('tax'),
  copyright           : belongsTo('event-copyright'),
  sessionTypes        : hasMany('session-type'),
  user                : belongsTo('user', { inverse: 'events' }),

  customForms     : hasMany('custom-form'),
  attendees       : hasMany('attendee'),
  orderStatistics : belongsTo('order-statistics-event'),
  roleInvites     : hasMany('role-invite'),
  videoStream     : belongsTo('video-stream'),

  owner             : belongsTo('user', { inverse: null }),
  organizers        : hasMany('user', { inverse: null }),
  coorganizers      : hasMany('user', { inverse: null }),
  trackOrganizers   : hasMany('user', { inverse: null }),
  registrars        : hasMany('user', { inverse: null }),
  moderators        : hasMany('user', { inverse: null }),
  roles             : hasMany('users-events-role'),
  sessionFavourites : hasMany('user-favourite-session'),
  speakerInvites    : hasMany('speaker-invite'),

  /**
   * The discount code applied to this event [Form(1) discount code]
   *
   * @see app/models/discount-code.js
   */
  discountCode: belongsTo('discount-code'),

  /**
   * The discount codes created for this event's tickets [Form(2) discount code]
   *
   * @see app/models/discount-code.js
   */
  discountCodes: hasMany('discount-code'),

  accessCodes: hasMany('access-code'),

  /**
   * Computed properties
   */

  startsAtDate : computedDateTimeSplit.bind(this)('startsAt', 'date', 'endsAt'),
  startsAtTime : computedDateTimeSplit.bind(this)('startsAt', 'time', 'endsAt'),
  endsAtDate   : computedDateTimeSplit.bind(this)('endsAt', 'date'),
  endsAtTime   : computedDateTimeSplit.bind(this)('endsAt', 'time'),

  shortLocationName: computed('locationName', function() {
    if (!this.locationName) {
      return '';
    }
    const splitLocations = this.locationName.split(',');
    if (splitLocations.length <= 3) {
      return this.locationName;
    } else {
      return splitLocations.splice(1, splitLocations.length).join();
    }
  }),

  totalSales: computed('orderStatistics', function() {
    return this.get('orderStatistics.tickets.placed') + this.get('orderStatistics.tickets.completed');
  }),

  url: computed('identifier', function() {
    const origin = this.fastboot.isFastBoot ? `${this.fastboot.request.protocol}//${this.fastboot.request.host}` : location.origin;
    return origin + this.router.urlFor('public', this.id);
  }),

  sessionsByState: computed('sessions', function() {
    return groupBy(this.sessions.toArray(), 'data.state');
  }),

  isStripeConnectionValid: computed('canPayByStripe', 'stripeAuthorization.stripePublishableKey', function() {
    if (!this.canPayByStripe) {
      return true;
    }
    return this.canPayByStripe && this.get('stripeAuthorization.stripePublishableKey');
  }),

  isSingleDay: computed('startsAt', 'endsAt', function() {
    return this.startsAt.isSame(this.endsAt, 'day');
  }),

  isSchedulePublished: computed('schedulePublishedOn', function() {
    return this.schedulePublishedOn && this.schedulePublishedOn.toISOString() !== moment(0).toISOString();
  })

}) {

  hasAccess(currentUser) {
    return currentUser && (currentUser.isAnAdmin || currentUser.email === this.owner.get('email')
        || this.organizers.includes(currentUser)
        || this.coorganizers.includes(currentUser));
  }

}
