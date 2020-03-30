import $ from 'jquery';
import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  classNames : ['tabbed-navigation'],
  item       : null,

  currentRoute: computed('session.currentRouteName', 'item', function() {
    const path = this.session.currentRouteName;
    if (path) {
      return this.item;
    }
  }),
  didInsertElement() {
    const { isMobile } = this.device;
    if (isMobile) {
      $('a', this.element).addClass('vertical-item');
    } else {
      $('a', this.element).removeClass('vertical-item');
    }
    this.set('item', $('a.active', this.element).text().trim());
  },
  didUpdate() {
    const { isMobile } = this.device;
    if (isMobile) {
      $('a', this.element).addClass('vertical-item');
    } else {
      $('a', this.element).removeClass('vertical-item');
    }
  },
  actions: {
    toggleMenu(mode) {
      const menu = $('div.menu', this.element);
      menu.toggleClass('hidden');
      if (mode === 'reset') {
        this.set('item', event.srcElement.text);
      }
    }
  }
});
