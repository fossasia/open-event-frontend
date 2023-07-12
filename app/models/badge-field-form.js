
import attr from 'ember-data/attr';
import ModelBase from 'open-event-frontend/models/base';
import { belongsTo, hasMany } from 'ember-data/relationships';
import { computed } from '@ember/object';
import { htmlSafe } from '@ember/template';

export default ModelBase.extend({

  /**
   * Attributes
   */
  badge_id       : attr('string'),
  custom_field   : attr('string'),
  sample_text    : attr('string'),
  font_size      : attr('number'),
  font_name      : attr('string'),
  font_color     : attr('string'),
  text_rotation  : attr('number'),
  margin_top     : attr('number'),
  margin_bottom  : attr('number'),
  margin_left    : attr('number'),
  margin_right   : attr('number'),
  text_weight    : attr('number'),
  text_alignment : attr('string'),
  text_type      : attr('string'),
  is_deleted     : attr('boolean'),
  /**
   * Relationships
   */
  event          : belongsTo('event'),
  ticket         : hasMany('ticket'),

  getFieldStyle: computed('sampleText', 'fontSize', 'textAlignment', 'textType', function() {
    return htmlSafe('font-size: ' + this.fontSize + 'px; text-align: ' + this.textAlignment + '; text-transform: ' + this.textType);
  })


});
