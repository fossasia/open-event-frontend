
import attr from 'ember-data/attr';
import ModelBase from 'open-event-frontend/models/base';
import { belongsTo, hasMany } from 'ember-data/relationships';
import { computed } from '@ember/object';
import { htmlSafe } from '@ember/template';

export default ModelBase.extend({

  /**
   * Attributes
   */
  badgeID       : attr('string'),
  customField   : attr('string'),
  sampleText    : attr('string'),
  fontSize      : attr('number'),
  fontName      : attr('string'),
  fontColor     : attr('string'),
  textRotation  : attr('number'),
  marginTop     : attr('number'),
  marginBottom  : attr('number'),
  marginLeft    : attr('number'),
  marginRight   : attr('number'),
  textWeight    : attr('number'),
  textAlignment : attr('string'),
  textType      : attr('string'),
  isDeleted     : attr('boolean'),
  /**
   * Relationships
   */
  event         : belongsTo('event'),
  ticket        : hasMany('ticket'),

  getFieldStyle: computed('sampleText', 'fontSize', 'textAlignment', 'textType', function() {
    return htmlSafe('font-size: ' + this.fontSize + 'px; text-align: ' + this.textAlignment + '; text-transform: ' + this.textType);
  })


});
