import Ember from 'ember';
import moment from 'moment';
import { FORM_DATE_FORMAT } from 'open-event-frontend/utils/dictionary/date-time';

const { $, Mixin, merge, run: { debounce } } = Ember;

export default Mixin.create({
  actions: {
    mutateOne(param, value) {
      this.set(param, value[0]);
    }
  },

  autoScrollToErrors : true,
  autoScrollSpeed    : 200,

  getForm() {
    return this.get('$form');
  },

  onValid(callback) {
    this.getForm().form('validate form');
    if (this.getForm().form('is valid')) {
      callback();
    }
  },

  didRender() {
    this._super.call(this);
    debounce(this, () => {
      const defaultFormRules = {
        onFailure: formErrors => {
          if (this.autoScrollToErrors) {
            // Scroll to the first error message
            if (formErrors.length > 0) {
              $('html,body').animate({
                scrollTop: this.$(`div:contains('${formErrors[0]}')`).offset().top
              }, this.autoScrollSpeed);
            }
          }
        }
      };

      const $popUps = this.$('.has.popup');
      if ($popUps) {
        $popUps.popup({
          hoverable: true
        });
      }

      const $checkBoxes = this.$('.ui.checkbox');
      if ($checkBoxes) {
        $checkBoxes.checkbox();
      }

      let $form = this.$('.ui.form');
      if ($form) {
        $form = $form.first();
        if (this.get('getValidationRules') && $form) {
          $form.form(merge(defaultFormRules, this.getValidationRules()));
        }

        if ($form && this) {
          this.set('$form', $form);
        }
      }
    }, 400);
  },

  didInsertElement() {
    this._super.call(this);
    $.fn.form.settings.rules.date = (value, format = FORM_DATE_FORMAT) => {
      if (value && value.length > 0 && format) {
        return moment(value, format).isValid();
      }
      return true;
    };
  }

});
