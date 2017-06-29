import Ember from 'ember';
import moment from 'moment';
import attr from 'ember-data/attr';
import Model from 'ember-data/model';
import { hasMany, belongsTo } from 'ember-data/relationships';
import { computedDateTimeSplit, computedSegmentedLink } from 'open-event-frontend/utils/computed-helpers';

const { computed, inject: { service }, on } = Ember;

const detectedTimezone = moment.tz.guess();

export default Model.extend({

  /**
   * Service Injection
   */

  routing: service('-routing'),

  /**
   * Attributes
   */

  identifier             : attr('string'),
  name                   : attr('string'),
  description            : attr('string'),
  startsAt               : attr('date', { defaultValue: () => moment.tz(detectedTimezone).add(1, 'months').startOf('day').toDate() }),
  endsAt                 : attr('date', { defaultValue: () => moment.tz(detectedTimezone).add(1, 'months').hour(17).minute(0).toDate() }),
  timezone               : attr('string', { defaultValue: detectedTimezone }),
  locationName           : attr('string'),
  searchableLocationName : attr('string'),

  longitude : attr('number', { defaultValue: 0.0 }),
  latitude  : attr('number', { defaultValue: 0.0 }),

  logoUrl           : attr('string'),
  thumbnailImageUrl : attr('string'),
  largeImageUrl     : attr('string'),
  originalImageUrl  : attr('string'),
  iconImageUrl      : attr('string'),

  isMapShown                : attr('boolean', { defaultValue: true }),
  isSponsorsEnabled         : attr('boolean', { defaultValue: false }),
  isTicketingEnabled        : attr('boolean', { defaultValue: true }),
  isSessionsSpeakersEnabled : attr('boolean', { defaultValue: false }),

  isTaxEnabled    : attr('boolean', { defaultValue: false }),
  canPayByPapal   : attr('boolean', { defaultValue: false }),
  canPayByStripe  : attr('boolean', { defaultValue: false }),
  canPayByCheque  : attr('boolean', { defaultValue: false }),
  canPayByBank    : attr('boolean', { defaultValue: false }),
  canPayOnsite    : attr('boolean', { defaultValue: false }),
  paymentCountry  : attr('string'),
  paymentCurrency : attr('string', { defaultValue: 'USD' }),
  paypalEmail     : attr('string'),
  chequeDetails   : attr('string'),
  bankDetails     : attr('string'),
  onsiteDetails   : attr('string'),

  schedulePublishedOn: attr('date'),

  hasOrganizerInfo: attr('boolean',  { defaultValue: false }),

  organizerName        : attr('string'),
  organizerDescription : attr('string'),

  externalEventUrl : attr('string'),
  ticketUrl        : attr('string'),
  codeOfConduct    : attr('string'),

  state   : attr('string', { defaultValue: 'draft' }),
  privacy : attr('string', { defaultValue: 'public' }),

  pentabarfUrl : attr('string'),
  xcalUrl      : attr('string'),
  icalUrl      : attr('string'),

  createdAt : attr('date'),
  deletedAt : attr('date'),

  /**
   * Relationships
   */
  type           : belongsTo('event-type'),
  topic          : belongsTo('event-topic'),
  subTopic       : belongsTo('event-sub-topic'),
  sessions       : hasMany('session'),
  sponsors       : hasMany('sponsor'),
  microlocations : hasMany('microlocation'),
  tracks         : hasMany('track'),
  tickets        : hasMany('ticket'),
  socialLinks    : hasMany('social-link'),
  speakersCall   : belongsTo('speakers-call'),
  tax            : belongsTo('tax'),
  copyright      : belongsTo('event-copyright'),
  sessionTypes   : hasMany('session-type'),

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

  /**
   * Computed properties
   */

  startsAtDate : computedDateTimeSplit.bind(this)('startsAt', 'date'),
  startsAtTime : computedDateTimeSplit.bind(this)('startsAt', 'time'),
  endsAtDate   : computedDateTimeSplit.bind(this)('endsAt', 'date'),
  endsAtTime   : computedDateTimeSplit.bind(this)('endsAt', 'date'),

  segmentedExternalEventUrl : computedSegmentedLink.bind(this)('externalEventUrl'),
  segmentedTicketUrl        : computedSegmentedLink.bind(this)('ticketUrl'),

  shortLocationName: computed('locationName', function() {
    if (!this.get('locationName')) {
      return '';
    }
    return this.get('locationName').split(',')[0];
  }),

  url: computed('identifier', function() {
    return `${location.protocol}//${location.hostname}${this.get('routing.router').generate('public', this.get('id'))}`;
  }),

  _ready: on('ready', function() {

  })
});
