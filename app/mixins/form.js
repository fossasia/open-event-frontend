import Ember from 'ember';
import moment from 'moment';

const { $, Mixin, on, merge } = Ember;

export default Mixin.create({
  actions: {
    mutateOne(param, value) {
      this.set(param, value[0]);
    }
  },

  _didInsertElement_: on('didInsertElement', function() {

    $.fn.form.settings.rules.date = (value, format = 'MM/DD/YYYY') => {
      return moment(value, format).isValid();
    };

    this.$('.has.popup').popup({
      hoverable: true
    });

    const defaultFormRules = {
      onFailure: formErrors => {
        // Scroll to the first error message
        if (formErrors.length > 0) {
          $('html,body').animate({
            scrollTop: this.$(`div:contains('${formErrors[0]}')`).offset().top
          }, 500);
        }
      }
    };

    this.$('.ui.checkbox').checkbox();
    if (this.get('getValidationRules')) {
      this.$('.ui.form').form(merge(defaultFormRules, this.get('getValidationRules')()));
    }
  })
});
