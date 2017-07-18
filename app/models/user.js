import attr from 'ember-data/attr';
import ModelBase from 'open-event-frontend/models/base';
import { hasMany } from 'ember-data/relationships';
import Ember from 'ember';

const { computed } = Ember;

export default ModelBase.extend({
  email        : attr('string'),
  password     : attr('string'),
  isVerified   : attr('boolean'),
  isSuperAdmin : attr('boolean'),
  isAdmin      : attr('boolean'),

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

  createdAt      : attr('moment'),
  deletedAt      : attr('moment'),
  lastAccessedAt : attr('moment'),

  isAnAdmin: computed.or('isSuperAdmin', 'isAdmin'),

  events: hasMany('event')
});
