
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
  sample_text       : attr('string', { defaultValue: 'Sample Text' }),
  font_size         : attr('number', { defaultValue: 14 }),
  font_name         : attr('string', { defaultValue: 'Arial' }),
  font_color        : attr('string', { defaultValue: '#000000' }),
  text_rotation     : attr('number', { defaultValue: 0 }),
  margin_top        : attr('number', { defaultValue: 0 }),
  margin_bottom     : attr('number', { defaultValue: 0 }),
  margin_left       : attr('number', { defaultValue: 0 }),
  margin_right      : attr('number', { defaultValue: 0 }),
  font_weight       : attr(),
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
    , 'margin_right', 'font_weight.@each', 'text_alignment', 'text_type', 'isDeleted', 'this', function() {
      let font_name = fieldFontName.find(item => {  return item.name === this.font_name});
      if (font_name) {
        font_name = font_name.value;
      }
      const font_weight = [];
      const font_style = [];
      const text_decoration = [];
      if (this.font_weight) {
        this.font_weight.forEach(element => {
          if (element.font_weight) {
            font_weight.addObject(element.font_weight);
          }
          if (element.font_style) {
            font_style.addObject(element.font_style);
          }
          if (element.text_decoration) {
            text_decoration.addObject(element.text_decoration);
          }
        });
      }
      return htmlSafe(
        'font-family: ' + font_name + '; font-size: ' + this.font_size + 'px; text-align: ' + this.text_alignment + '; text-transform: ' + this.text_type + '; color:' + this.font_color + '; font-weight:' + font_weight.join(',') + '; font-style:' + font_style.join(',') + '; text-decoration: ' + text_decoration.join(',') + '; -webkit-transform: rotate(' + this.text_rotation + 'deg); -moz-transform: rotate(' + this.text_rotation + 'deg); -o-transform: rotate(' + this.text_rotation + 'deg); writing-mode: lr-tb; margin-top:' + this.margin_top + 'mm; margin-bottom:' + this.margin_bottom + 'mm; margin-left:' + this.margin_left + 'mm; margin-right:' + this.margin_right + 'mm;');
    })
});
