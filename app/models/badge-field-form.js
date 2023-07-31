
import attr from 'ember-data/attr';
import ModelBase from 'open-event-frontend/models/base';
import { belongsTo, hasMany } from 'ember-data/relationships';
import { computed } from '@ember/object';
import { htmlSafe } from '@ember/template';
import { fieldFontName, badgeFieldFontWeight } from 'open-event-frontend/utils/dictionary/badge-field';

export default ModelBase.extend({

  /**
   * Attributes
   */
  badge_field_id    : attr('number'),
  badge_id          : attr('string'),
  field_identifier  : attr('string'),
  custom_field      : attr('string'),
  sample_text       : attr('string', { defaultValue: 'Sample Text' }),
  font_size         : attr('number', { defaultValue: 14 }),
  font_name         : attr('string', { defaultValue: 'Arial' }),
  font_color        : attr('string', { defaultValue: '#000000' }),
  text_rotation     : attr('number', { defaultValue: 0 }),
  margin_top        : attr('number', { defaultValue: 0 }),
  margin_bottom     : attr('number', { defaultValue: 0 }),
  margin_left       : attr('number', { defaultValue: 0 }),
  margin_right      : attr('number', { defaultValue: 0 }),
  font_weight      : attr({ defaultValue: () => {
    return badgeFieldFontWeight.find(item => item.name === 'Regular') 
  }}),
  text_alignment    : attr('string', { defaultValue: 'center' }),
  text_type         : attr('string', { defaultValue: 'None' }),
  is_deleted        : attr('boolean'),
  qr_custom_field   : attr(),
  is_field_expanded : attr('boolean', { defaultValue: true }),
  /**
   * Relationships
   */
  event             : belongsTo('event'),
  ticket            : hasMany('ticket'),

  getFieldStyle: computed('font_size', 'font_name', 'font_color', 'text_rotation', 'margin_top', 'margin_bottom', 'margin_left'
    , 'margin_right', 'font_weight', 'text_alignment', 'text_type', 'isDeleted', 'this', function() {
      let font_name = fieldFontName.find(item => {  return item.name === this.font_name});
      if (font_name) {
        font_name = font_name.value;
      }
      return htmlSafe(
        'font-family: ' + font_name + '; font-size: ' + this.font_size + 'px; text-align: ' + this.text_alignment + '; text-transform: ' + this.text_type + '; color:' + this.font_color + '; font-weight:' + this.font_weight.font_weight + '; font-style:' + this.font_weight.font_style + '; text-decoration: ' + this.font_weight.text_decoration + '; -webkit-transform: rotate(' + this.text_rotation + 'deg); -moz-transform: rotate(' + this.text_rotation + 'deg); -o-transform: rotate(' + this.text_rotation + 'deg); writing-mode: lr-tb; margin-top:' + this.margin_top + 'mm; margin-bottom:' + this.margin_bottom + 'mm; margin-left:' + this.margin_left + 'mm; margin-right:' + this.margin_right + 'mm;');
    })
});
