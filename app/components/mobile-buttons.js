import Ember from 'ember';

const { Component, computed } = Ember;
export default Component.extend({
  classNames        : ['ui'],
  classNameBindings : ['isMobile'],
  isMobile          : computed('device.isMobile', function() {
    if (this.get('device.isMobile')) {
      return 'mobile-buttons-mode';
    }
    return 'responsive-buttons';
  }),
  didInsertElement() {
    if (this.get('device.isMobile')) {
      this.$('div.button').addClass('link');
      this.$('div.button').addClass('item');
      this.$('div.item').removeClass('button');
      this.$('div.item').removeClass('ui');

      this.set('currentButton', this.$('div.item').first().text());
      this.$('div.item').on('click', { sup: this }, function(event) {
        event.data.sup.set('currentButton', this.innerHTML);
      });
    }
  },
  actions: {
    toggleMenu() {
      var menu = this.$('div.menu');
      menu.toggleClass('hidden');
    }
  }
});
