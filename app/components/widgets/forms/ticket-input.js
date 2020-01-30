import $ from 'jquery';
import Component from '@ember/component';
import { gte } from '@ember/object/computed';

export default Component.extend({
  classNames  : ['ui', 'celled', 'stackable', 'grid', 'ticket-row'],
  minMaxValid : gte('ticket.maxPrice', 'ticket.minPrice'),
  actions     : {
    toggleSettings() {
      this.toggleProperty('isExpanded');
    }
  },

  didRender() {
    this._super(...arguments);
    $('.icon.buttons', this.element).find('.button').popup();
  },

  willDestroyElement() {
    this._super(...arguments);
    $('.icon.buttons', this.element).find('.button').popup('destroy');
  }
});
