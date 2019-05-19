import { or } from '@ember/object/computed';
import { computed } from '@ember/object';
import { on } from '@ember/object/evented';
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
  invoice              : hasMany('event-invoice'),
  attendees            : hasMany('attendee'),
  speakers             : hasMany('speaker'),
  discountCodes        : hasMany('discount-code'),
  accessCodes          : hasMany('access-code'),
  organizerEvents      : hasMany('event'),
  coorganizerEvents    : hasMany('event'),
  trackOrganizerEvents : hasMany('event'),
  registrarEvents      : hasMany('event'),
  moderatorEvents      : hasMany('event'),
  marketerEvents       : hasMany('event'),
  salesAdminEvents     : hasMany('event'),


  _didUpdate: on('didUpdate', function(user) {
    if (toString(user.id) === toString(this.get('authManager.currentUser.id'))) {
      user = this.store.peekRecord('user', user.id);
      this.authManager.persistCurrentUser(user);
    }
  })
});
