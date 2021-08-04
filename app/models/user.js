import { or } from '@ember/object/computed';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import attr from 'ember-data/attr';
import ModelBase from 'open-event-frontend/models/base';
import { hasMany } from 'ember-data/relationships';
import { toString } from 'lodash-es';

export default class User extends ModelBase.extend({

  authManager : service(),
  l10n        : service(),

  email                  : attr('string'),
  password               : attr('string'),
  isVerified             : attr('boolean'),
  isSuperAdmin           : attr('boolean', { readOnly: true }),
  isBlocked              : attr('boolean'),
  isProfilePublic        : attr('boolean'),
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

  firstName  : attr('string'),
  lastName   : attr('string'),
  publicName : attr('string'),
  details    : attr('string'),
  contact    : attr('string'),

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

  isRocketChatRegistered: attr('boolean', { readOnly: true }),

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
  groups               : hasMany('group'),
  sessions             : hasMany('session'),
  feedbacks            : hasMany('feedback'),
  eventInvoices        : hasMany('event-invoice'),
  attendees            : hasMany('attendee'),
  speakers             : hasMany('speaker'),
  discountCodes        : hasMany('discount-code'),
  accessCodes          : hasMany('access-code'),
  favourites           : hasMany('user-favourite-session'),
  followers            : hasMany('user-follow-group'),
  ownerEvents          : hasMany('event', { readOnly: true }),
  organizerEvents      : hasMany('event', { readOnly: true }),
  coorganizerEvents    : hasMany('event', { readOnly: true }),
  trackOrganizerEvents : hasMany('event', { readOnly: true }),
  registrarEvents      : hasMany('event', { readOnly: true }),
  moderatorEvents      : hasMany('event', { readOnly: true }),
  marketerEvents       : hasMany('event', { readOnly: true }),
  salesAdminEvents     : hasMany('event', { readOnly: true }),

  didUpdate() {
    this._super(...arguments);
    if (toString(this.id) === toString(this.authManager.currentUser.id)) {
      const user = this.store.peekRecord('user', this.id);
      this.authManager.persistCurrentUser(user);
    }
  },

  fullName: computed('firstName', 'lastName', function() {
    return [this.firstName, this.lastName].filter(Boolean).join(' ');
  }),

  resolvedName: computed('publicName', 'fullName', function() {
    return this.publicName || this.fullName || this.l10n.t('Anonymous User');
  })
}) {}
