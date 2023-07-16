import Component from '@ember/component';
import { orderBy, union } from 'lodash-es';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import FormMixin from 'open-event-frontend/mixins/form';
import { booleanTextType } from 'open-event-frontend/utils/dictionary/boolean_text_type';
import { fieldFontName } from 'open-event-frontend/utils/dictionary/badge-field';

export default Component.extend(FormMixin, {
  router             : service(),
  autoScrollToErrors : false,
  isExpanded         : true,
  booleanTextType    : orderBy(booleanTextType, 'position'),

  getCustomFields: computed('includeCustomField', function() {
    return union(this.includeCustomField.map(item => item.name));
  }),

  getWarningFields: computed('data.custom_field', function() {
    const warningFields      = [];
    if (this.data.custom_field !== 'QR') {
      this.selectedTickets.forEach(ticket => {
        const listCFields = this.customForms.filter(form => (ticket.formID === form.formID) && form.isIncluded || form.isFixed).map(form => form.name);
        if (this.data.custom_field && !listCFields.includes(this.data.custom_field)) {
          warningFields.pushObject(
            {
              field  : this.data.custom_field,
              ticket : ticket.name
            }
          );
        }
      });
    }
    return warningFields;
  }),

  get fieldFont() {
    return orderBy(fieldFontName, 'name');
  },

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
        this.set('data.is_deleted', true);
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
      const cfield = this.includeCustomField.filter(item => item.name === code)[0];
      if (cfield) {
        this.set('data.field_identifier', cfield.fieldIdentifier);
      }
    },
    onChangeTextTransform(value) {
      this.set('data.text_type', value);
    },
    onChangeFontName(value) {
      this.set('data.font_name', value);
    },
    addFieldToQR(customFormName) {
      if (this.data.qr_custom_field == null) {
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
