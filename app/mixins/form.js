import Ember from 'ember';
import moment from 'moment';
import { FORM_DATE_FORMAT } from 'open-event-frontend/utils/dictionary';

const { $, Mixin, on, merge, run: { debounce } } = Ember;

export default Mixin.create({
  actions: {
    mutateOne(param, value) {
      this.set(param, value[0]);
    }
  },

  autoScrollToErrors : true,
  autoScrollSpeed    : 200,

  _didRender_: on('didRender', function() {
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

      this.$('.has.popup').popup({
        hoverable: true
      });

      this.$('.ui.checkbox').checkbox();

      if (this.get('getValidationRules')) {
        this.$('.ui.form').form(merge(defaultFormRules, this.getValidationRules()));
      }
    }, 400);
  }),

  _didInsertElement_: on('didInsertElement', function() {
    $.fn.form.settings.rules.date = (value, format = FORM_DATE_FORMAT) => {
      if (value && value.length > 0 && format) {
        return moment(value, format).isValid();
      }
      return true;
    };
  })
});
