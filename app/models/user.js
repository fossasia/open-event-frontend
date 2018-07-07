import { or } from '@ember/object/computed';
import { computed } from '@ember/object';
import { on } from '@ember/object/evented';
import { inject as service } from '@ember/service';
import attr from 'ember-data/attr';
import ModelBase from 'open-event-frontend/models/base';
import { hasMany } from 'ember-data/relationships';
import { toString } from 'lodash';

export default ModelBase.extend({

  authManager: service(),

  email        : attr('string'),
  password     : attr('string'),
  isVerified   : attr('boolean', { readOnly: true }),
  isSuperAdmin : attr('boolean', { readOnly: true }),
  isAdmin      : attr('boolean', { readOnly: true }),

  firstName : attr('string'),
  lastName  : attr('string'),
  details   : attr('string'),
  contact   : attr('string'),

  avatarUrl         : attr('string'),
  iconImageUrl      : attr('string'),
  smallImageUrl     : attr('string'),
  thumbnailImageUrl : attr('string'),

  facebookUrl   : attr('string'),
  instagramUrl  : attr('string'),
  twitterUrl    : attr('string'),
  googlePlusUrl : attr('string'),

  createdAt      : attr('moment', { readOnly: true }),
  deletedAt      : attr('moment', { readOnly: true }),
  lastAccessedAt : attr('moment', { readOnly: true }),

  status: computed('lastAccessedAt', function() {
    return (new Date().getMonth() - new Date(this.get('lastAccessedAt')).getMonth() < 1);
  }),
  isAnAdmin: or('isSuperAdmin', 'isAdmin'),

  /**
   * Relationships
   */
  emailNotifications : hasMany('email-notification'),
  notifications      : hasMany('notification'),
  orders             : hasMany('order'),
  events             : hasMany('event', { inverse: 'user' }),
  sessions           : hasMany('session'),
  invoice            : hasMany('event-invoice'),
  attendees          : hasMany('attendee'),
  speakers           : hasMany('speaker'),
  discountCodes      : hasMany('discount-code'),
  accessCodes        : hasMany('access-code'),

  _didUpdate: on('didUpdate', function(user) {
    if (toString(user.id) === toString(this.get('authManager.currentUser.id'))) {
      user = this.get('store').peekRecord('user', user.id);
      this.get('authManager').persistCurrentUser(user);
    }
  })
});
