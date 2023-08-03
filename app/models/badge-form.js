
import attr from 'ember-data/attr';
import ModelBase from 'open-event-frontend/models/base';
import { belongsTo, hasMany } from 'ember-data/relationships';

export default ModelBase.extend({

  /**
   * Attributes
   */
  badgeID             : attr('string'),
  isShowingSampleData : attr('boolean'),
  badgeSize           : attr('string', { defaultValue: '4 x 6 inch (101.6 x 152.4 mm)' }),
  badgeColor          : attr('string'),
  badgeImageUrl       : attr('string'),
  badgeOrientation    : attr('string', { defaultValue: 'Portrait' }),
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
