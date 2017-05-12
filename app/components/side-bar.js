import Ember from 'ember';

const { Component } = Ember;

export default Component.extend({

  toggleSidebar() {
    this.$('.ui.sidebar').toggleClass('visible');
  },

  hideSidebar() {
    this.$('.ui.sidebar').removeClass('visible');
  },

  didInsertElement() {
    this._super(...arguments);

    /**
     * Not proud of myself for doing this. But, gets the job done.
     *
     * Sometimes, css does drive me nuts. -_-
     *
     * - @niranjan94
     */

    this.set('$sidebarOpener', this.$('.open.sidebar'));
    this.set('$sidebarClosers', this.$('.ui.sidebar').find('.item,a,.link,button'));
    this.get('$sidebarClosers').push(this.$('.main-container')[0]);

    if (this.get('$sidebarOpener')) {
      this.get('$sidebarOpener').on('click', this.toggleSidebar.bind(this));
    }

    if (this.get('$sidebarClosers') && this.get('$sidebarClosers').length > 0) {
      this.get('$sidebarClosers').on('click', this.hideSidebar.bind(this));
    }
  },

  willDestroyElement() {
    this._super(...arguments);
    if (this.get('$sidebarOpener')) {
      this.get('$sidebarOpener').off('click', this.toggleSidebar.bind(this));
    }
    if (this.get('$sidebarClosers') && this.get('$sidebarClosers').length > 0) {
      this.get('$sidebarClosers').off('click', this.hideSidebar.bind(this));
    }
  }
});
