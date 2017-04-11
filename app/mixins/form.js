import Ember from 'ember';

const { Mixin, on } = Ember;

export default Mixin.create({
  actions: {
    mutateOne(param, value) {
      this.set(param, value[0]);
    }
  },

  _didInsertElement_: on('didInsertElement', function() {
    this.$('.has.popup').popup({
      hoverable: true
    });
    this.$('.ui.checkbox').checkbox();
    if (this.get('getValidationRules')) {
      this.$('.ui.form').form(this.get('getValidationRules')());
    }
  })
});
