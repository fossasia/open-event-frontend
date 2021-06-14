import attr from 'ember-data/attr';
import ModelBase from 'open-event-frontend/models/base';
import { belongsTo, hasMany } from 'ember-data/relationships';


export default class Group extends ModelBase.extend({

  name       : attr('string'),
  createdAt  : attr('moment', { readOnly: true }),
  modifiedAt : attr('moment'),
  /**
   * Relationships
   */
  user       : belongsTo('user'),
  events     : hasMany('event'),
  roles      : hasMany('users-groups-role'),
  followers  : hasMany('user-follow-group')
}) {}

