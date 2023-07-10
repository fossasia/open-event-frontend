
import attr from 'ember-data/attr';
import ModelBase from 'open-event-frontend/models/base';
import { belongsTo, hasMany } from 'ember-data/relationships';

export default ModelBase.extend({

  /**
   * Attributes
   */
  badgeID             : attr('string'),
  badgeFields         : hasMany('badge-field-form'),
  isShowingSampleData : false,
  badgeSize           : attr('string'),
  badgeColor          : attr('string'),
  badgeImageURL       : attr('string'),
  badgeOrientation    : attr('string'),
  /**
   * Relationships
   */
  event               : belongsTo('event'),
  ticket              : hasMany('ticket')
});
