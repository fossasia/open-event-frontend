import $ from 'jquery';
import Component from '@ember/component';

export default Component.extend({

  classNames: ['ui', 'action', 'input', 'fluid'],

  didInsertElement() {
    this._super(...arguments);
    const _this = this;
    $('.picker', this.element).colorPicker({
      doRender : false,
      opacity  : false,
      renderCallback() {
        _this.set('value', `#${this.color.colors.HEX}`);
      }
    });
  },

  willDestroyElement() {
    this._super(...arguments);
    $('.picker', this.element).colorPicker('destroy');
  }
});
