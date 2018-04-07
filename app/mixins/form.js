import $ from 'jquery';
import Mixin from '@ember/object/mixin';
import { merge } from '@ember/polyfills';
import { debounce } from '@ember/runloop';
import moment from 'moment';
import { FORM_DATE_FORMAT } from 'open-event-frontend/utils/dictionary/date-time';
import { isTesting } from 'open-event-frontend/utils/testing';

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
    this._super(...arguments);
    if (isTesting) { return }
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

      const $checkBoxes = this.$('.ui.checkbox:not(.ember-view)');
      if ($checkBoxes) {
        $checkBoxes.checkbox();
      }

      let $form;
      if ((this.get('tagName') && this.get('tagName').toLowerCase() === 'form') || (this.$() && this.$().prop('tagName').toLowerCase() === 'form')) {
        $form = this.$();
        $form.addClass('ui form');
      } else {
        $form = this.$('.ui.form');
      }
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
    this._super(...arguments);
    console.warn('isTesting', isTesting ? 'true' : 'false');
    if (isTesting) { return }
    $.fn.form.settings.rules.date = (value, format = FORM_DATE_FORMAT) => {
      if (value && value.length > 0 && format) {
        return moment(value, format).isValid();
      }
      return true;
    };
  },

  willDestroyElement() {
    this._super(...arguments);
    if (isTesting) { return }
    const $popUps = this.$('.has.popup');
    if ($popUps) {
      $popUps.popup('destroy');
    }
  }
});
