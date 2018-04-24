import Component from '@ember/component';

export default Component.extend({

  classNames: ['ui', 'action', 'input', 'fluid'],

  didInsertElement() {
    this._super(...arguments);
    const _this = this;
    this.$('.picker').colorPicker({
      doRender : false,
      opacity  : false,
      renderCallback() {
        _this.set('value', `#${this.color.colors.HEX}`);
      }
    });
  },

  willDestroyElement() {
    this._super(...arguments);
    this.$('.picker').colorPicker('destroy');
  }
});
