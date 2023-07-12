import Component from '@ember/component';
import { orderBy } from 'lodash-es';
import { inject as service } from '@ember/service';
import FormMixin from 'open-event-frontend/mixins/form';
import { booleanTextType } from 'open-event-frontend/utils/dictionary/boolean_text_type';
import tinycolor from 'tinycolor2';

export default Component.extend(FormMixin, {
  router             : service(),
  autoScrollToErrors : false,
  isExpanded         : true,
  booleanTextType    : orderBy(booleanTextType, 'position'),

  actions: {
    toggleSetting() {
      if (!this.isExpanded) {
        this.set('isExpanded', true);
      } else {
        this.set('isExpanded', false);
      }
    },
    removeForm() {
      if (this.removeBadgeField) {
        this.set('data.isDeleted', true);
        this.removeBadgeField(this.data);
      }
    },
    includeCustomForm(item) {
      if (this.includeCustomForm) {
        this.includeCustomForm(item);
      }
    },
    toggleTextAlignments(item) {
      this.set('data.text_alignment', item);
    },
    onChangeCustomField(code) {
      if (this.onChange) {
        this.onChange(this.data.custom_field, code);
        this.set('data.custom_field', code);
      }
    },
    onChangeTextTransform(value) {
      this.set('data.text_type', value);
    },
    onChangeFontName(value) {
      this.set('data.font_name', value);
    },
    onChangeFontColor(color) {
      const colorCode = tinycolor(color.target.value);
      this.set('data.font_color', colorCode.toHexString());
    }
  }
});
