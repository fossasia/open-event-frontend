import Component from '@ember/component';
import { orderBy } from 'lodash-es';
import { inject as service } from '@ember/service';
import FormMixin from 'open-event-frontend/mixins/form';
import { booleanTextType } from 'open-event-frontend/utils/dictionary/boolean_text_type';

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
    addFieldToQR(customFormName) {
      if (this.data.qr_custom_field === null) {
        this.data.qr_custom_field = [];
      }
      if (!this.data.qr_custom_field.includes(customFormName)) {
        this.data.qr_custom_field.pushObject(customFormName);
      } else {
        this.data.qr_custom_field.removeObject(customFormName);
      }

    }
  }
});
