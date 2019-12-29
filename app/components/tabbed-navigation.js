import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  classNames : ['tabbed-navigation'],
  item       : null,

  currentRoute: computed('session.currentRouteName', 'item', function() {
    const path = this.get('session.currentRouteName');
    if (path) {
      return this.item;
    }
  }),
  didInsertElement() {
    const isMobile = this.get('device.isMobile');
    if (isMobile) {
      this.$('a').addClass('vertical-item');
    } else {
      this.$('a').removeClass('vertical-item');
    }

    this.set('item', this.$('a.active').text().trim());
  },
  didUpdate() {
    const isMobile = this.get('device.isMobile');
    if (isMobile) {
      this.$('a').addClass('vertical-item');
    } else {
      this.$('a').removeClass('vertical-item');
    }
  },
  actions: {
    toggleMenu(mode) {
      const menu = this.$('div.menu');
      menu.toggleClass('hidden');
      if (mode === 'reset') {
        this.set('item', event.srcElement.text);
      }
    }
  }
});
