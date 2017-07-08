import Ember from 'ember';

const { Component, computed } = Ember;
export default Component.extend({
  classNames : ['tabbed-navigation'],
  item       : null,

  currentRoute: computed('session.currentRouteName', 'item', function() {
    var path = this.get('session.currentRouteName');
    if (path) {
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
    toggleMenu(mode) {
      var menu = this.$('div.menu');
      menu.toggleClass('hidden');

      if (mode === 'reset') {
        this.set('item', this.$('a.active'));
      }
    }
  }
});
