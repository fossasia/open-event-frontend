import Ember from 'ember';

const { Component, computed } = Ember;
export default Component.extend({
  classNames : ['tabbed-navigation'],
  item       : null,

  currentRoute: computed('session.currentRouteName', 'item', function() {
    var path = this.get('session.currentRouteName');
    if (path) {
      return this.get('item');
    }
  }),
  didInsertElement() {
    var isMobile = this.get('device.isMobile');
    if (isMobile) {
      this.$('a').addClass('vertical-item');
    } else {
      this.$('a').removeClass('vertical-item');
    }
    this.set('item', this.$('a.active').text().trim());
  },
  didUpdate() {
    var isMobile = this.get('device.isMobile');
    if (isMobile) {
      this.$('a').addClass('vertical-item');
    } else {
      this.$('a').removeClass('vertical-item');
    }
  },
  actions: {
    toggleMenu(mode) {
      var menu = this.$('div.menu');
      menu.toggleClass('hidden');
      if (mode === 'reset') {
        this.set('item', event.srcElement.text);
      }
    }
  }
});
