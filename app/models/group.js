import attr from 'ember-data/attr';
import ModelBase from 'open-event-frontend/models/base';
import { belongsTo, hasMany } from 'ember-data/relationships';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default class Group extends ModelBase.extend({

  router   : service(),
  fastboot : service(),


  name       : attr('string'),
  about      : attr('string'), 
  createdAt  : attr('moment', { readOnly: true }),
  modifiedAt : attr('moment'),
  deletedAt  : attr('moment'),
  /**
   * Relationships
   */
  user       : belongsTo('user'),
  events     : hasMany('event'),
  roles      : hasMany('users-groups-role'),
  follower   : belongsTo('user-follow-group'),

  url: computed('identifier', function() {
    const origin = this.fastboot.isFastBoot ? `${this.fastboot.request.protocol}//${this.fastboot.request.host}` : location.origin;
    return origin + this.router.urlFor('groups.edit', this.id);
  })
}) {}

