import $ from 'jquery';
import Component from '@ember/component';

export default Component.extend({

  sidebarVisible: false,

  toggleSidebar() {
    this.toggleProperty('sidebarVisible');
  },

  hideSidebar() {
    this.set('sidebarVisible', false);
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

    this.set('$sidebarOpener', $('.open.sidebar', this.element));
    this.set('$sidebarClosers', $('.ui.sidebar', this.element).find('.item,a,.link,button'));
    this.$sidebarClosers.push($('.main-container', this.element)[0]);

    if (this.$sidebarOpener) {
      this.$sidebarOpener.on('click', this.toggleSidebar.bind(this));
    }

    if (this.$sidebarClosers && this.$sidebarClosers.length > 0) {
      this.$sidebarClosers.on('click', this.hideSidebar.bind(this));
    }
  },

  willDestroyElement() {
    this._super(...arguments);
    if (this.$sidebarOpener) {
      this.$sidebarOpener.off('click', this.toggleSidebar.bind(this));
    }

    if (this.$sidebarClosers && this.$sidebarClosers.length > 0) {
      this.$sidebarClosers.off('click', this.hideSidebar.bind(this));
    }
  }
});
