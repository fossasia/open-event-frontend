import Ember from 'ember';

const { Component } = Ember;

export default Component.extend({

  classNames: ['ui', 'action', 'input', 'fluid'],

  didInsertElement() {
    this._super.call(this);
    const _this = this;
    this.$('.picker').colorPicker({
      doRender : false,
      opacity  : false,
      renderCallback() {
        _this.set('value', `#${this.color.colors.HEX}`);
      }
    });
  }
});
