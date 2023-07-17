
import attr from 'ember-data/attr';
import ModelBase from 'open-event-frontend/models/base';
import { belongsTo, hasMany } from 'ember-data/relationships';

export default ModelBase.extend({

  /**
   * Attributes
   */
  badgeID             : attr('string'),
  isShowingSampleData : attr('boolean'),
  badgeSize           : attr('string'),
  badgeColor          : attr('string'),
  badgeImageUrl       : attr('string'),
  badgeOrientation    : attr('string'),
  badgeQRFields       : attr(),
  badgeFields         : attr(),
  selectedImage       : attr('string'),
  imageUrl            : attr('string'),
  /**
   * Relationships
   */
  event               : belongsTo('event'),
  ticket              : hasMany('ticket')
});
