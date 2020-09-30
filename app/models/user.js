import { or } from '@ember/object/computed';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import attr from 'ember-data/attr';
import ModelBase from 'open-event-frontend/models/base';
import { hasMany } from 'ember-data/relationships';
import { toString } from 'lodash-es';

export default ModelBase.extend({

  authManager: service(),

  email                  : attr('string'),
  password               : attr('string'),
  isVerified             : attr('boolean', { readOnly: true }),
  isSuperAdmin           : attr('boolean', { readOnly: true }),
  isAdmin                : attr('boolean'),
  isUserOwner            : attr('boolean'),
  isUserOrganizer        : attr('boolean'),
  isUserCoorganizer      : attr('boolean'),
  isUserTrackOrganizer   : attr('boolean'),
  isUserModerator        : attr('boolean'),
  isUserRegistrar        : attr('boolean'),
  isSalesAdmin           : attr('boolean'),
  isMarketer             : attr('boolean'),
  wasRegisteredWithOrder : attr('boolean'),

  firstName : attr('string'),
  lastName  : attr('string'),
  details   : attr('string'),
  contact   : attr('string'),

  avatarUrl         : attr('string'),
  iconImageUrl      : attr('string'),
  smallImageUrl     : attr('string'),
  thumbnailImageUrl : attr('string'),
  originalImageUrl  : attr('string'),

  facebookUrl   : attr('string'),
  instagramUrl  : attr('string'),
  twitterUrl    : attr('string'),
  googlePlusUrl : attr('string'),

  facebookId: attr('string', { readOnly: true }),

  createdAt      : attr('moment', { readOnly: true }),
  deletedAt      : attr('moment'),
  lastAccessedAt : attr('moment', { readOnly: true }),

  /**
   * Billing Contact Information
   */

  billingContactName    : attr('string'),
  billingPhone          : attr('string'),
  billingCountry        : attr('string'),
  company               : attr('string'),
  billingAddress        : attr('string'),
  billingCity           : attr('string'),
  billingZipCode        : attr('string'),
  billingTaxInfo        : attr('string'),
  billingAdditionalInfo : attr('string'),
  billingState          : attr('string'),

  status: computed('lastAccessedAt', 'deletedAt', function() {
    if (this.deletedAt == null) {
      if (this.lastAccessedAt == null) {
        return 'inactive';
      }
      return (new Date().getMonth() - new Date(this.lastAccessedAt).getMonth() <= 12) ? 'active' : 'inactive';
    } else {
      return 'deleted';
    }
  }),
  isAnAdmin: or('isSuperAdmin', 'isAdmin'),

  /**
   * Relationships
   */
  emailNotifications   : hasMany('email-notification'),
  notifications        : hasMany('notification'),
  orders               : hasMany('order'),
  events               : hasMany('event', { inverse: 'user' }),
  sessions             : hasMany('session'),
  feedbacks            : hasMany('feedback'),
  eventInvoices        : hasMany('event-invoice'),
  attendees            : hasMany('attendee'),
  speakers             : hasMany('speaker'),
  discountCodes        : hasMany('discount-code'),
  accessCodes          : hasMany('access-code'),
  ownerEvents          : hasMany('event'),
  organizerEvents      : hasMany('event'),
  coorganizerEvents    : hasMany('event'),
  trackOrganizerEvents : hasMany('event'),
  registrarEvents      : hasMany('event'),
  moderatorEvents      : hasMany('event'),
  marketerEvents       : hasMany('event'),
  salesAdminEvents     : hasMany('event'),

  didUpdate() {
    this._super(...arguments);
    if (toString(this.id) === toString(this.authManager.currentUser.id)) {
      const user = this.store.peekRecord('user', this.id);
      this.authManager.persistCurrentUser(user);
    }
  },

  fullName: computed('firstName', 'lastName', function() {
    return [this.firstName, this.lastName].filter(Boolean).join(' ');
  })
});
