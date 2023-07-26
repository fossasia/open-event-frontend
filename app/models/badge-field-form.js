
import attr from 'ember-data/attr';
import ModelBase from 'open-event-frontend/models/base';
import { belongsTo, hasMany } from 'ember-data/relationships';
import { computed } from '@ember/object';
import { htmlSafe } from '@ember/template';
import { fieldFontName } from 'open-event-frontend/utils/dictionary/badge-field';

export default ModelBase.extend({

  /**
   * Attributes
   */
  badge_field_id    : attr('number'),
  badge_id          : attr('string'),
  field_identifier  : attr('string'),
  custom_field      : attr('string'),
  sample_text       : attr('string'),
  font_size         : attr('number'),
  font_name         : attr('string'),
  font_color        : attr('string'),
  text_rotation     : attr('number'),
  margin_top        : attr('number'),
  margin_bottom     : attr('number'),
  margin_left       : attr('number'),
  margin_right      : attr('number'),
  font_weight       : attr('number'),
  text_alignment    : attr('string', { defaultValue: 'center' }),
  text_type         : attr('string'),
  is_deleted        : attr('boolean'),
  qr_custom_field   : attr(),
  is_field_expanded : attr('boolean', { defaultValue: true }),
  /**
   * Relationships
   */
  event            : belongsTo('event'),
  ticket           : hasMany('ticket'),

  getFieldStyle: computed('font_size', 'font_name', 'font_color', 'text_rotation', 'margin_top', 'margin_bottom', 'margin_left'
    , 'margin_right', 'font_weight', 'text_alignment', 'text_type', 'isDeleted', 'this', function() {
      let font_name = fieldFontName.find(item => {  return item.name === this.font_name});
      if (font_name) {
        font_name = font_name.value;
      }
      return htmlSafe(
        'font-family: ' + font_name + '; font-size: ' + this.font_size + 'px; text-align: ' + this.text_alignment + '; text-transform: ' + this.text_type + '; color:' + this.font_color + '; font-weight:' + this.font_weight + '; -webkit-transform: rotate(' + this.text_rotation + 'deg); -moz-transform: rotate(' + this.text_rotation + 'deg); -o-transform: rotate(' + this.text_rotation + 'deg); writing-mode: lr-tb; margin-top:' + this.margin_top + 'mm; margin-bottom:' + this.margin_bottom + 'mm; margin-left:' + this.margin_left + 'mm; margin-right:' + this.margin_right + 'mm;');
    })
});
