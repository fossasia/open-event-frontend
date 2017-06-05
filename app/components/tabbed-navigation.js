import Ember from 'ember';

const { Component, computed } = Ember;
export default Component.extend({
  classNames : ['tabbed-navigation'],
  item       : null,

  currentRoute: computed('session.currentRouteName', 'item', function() {
    var path = this.get('session.currentRouteName');
    var item = this.get('item');
    if (path && item) {
      this.set('item', this.$('a.active'));
      this.$('a').addClass('vertical-item');
      return this.$('a.active').text().trim();
    }
  }),
  didInsertElement() {
    var isMobile = this.get('device.isMobile');
    if (isMobile) {
      this.$('a').addClass('vertical-item');
    }
    this.set('item', this.$('a.active'));
  },
  actions: {
    toggleMenu() {
      var menu = this.$('div.menu');
      menu.toggleClass('hidden');
    }
  }
});
