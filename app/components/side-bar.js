import classic from 'ember-classic-decorator';
import $ from 'jquery';
import Component from '@ember/component';
import { action, computed } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
@classic
export default class SideBar extends Component {
  @tracked
  sidebarVisible = false;

  @service('event') evtService;

  toggleSidebar() {
    this.toggleProperty('sidebarVisible');
  }

  hideSidebar() {
    this.set('sidebarVisible', false);
  }

  @action
  handleKeyPress() {
    if (event.code === 'Enter') {
      this.set('sidebarVisible', false);
      this.search();
    }
  }

  @computed('session.currentRouteName')
  get isEventPageRoute() {
    const currentRouteName = String(this.session.currentRouteName);
    return currentRouteName.includes('public') && !currentRouteName.includes('group');
  }

  didInsertElement() {
    super.didInsertElement(...arguments);

    /**
     * Not proud of myself for doing this. But, gets the job done.
     *
     * Sometimes, css does drive me nuts. -_-
     *
     * - @niranjan94
     */

    this.set('$sidebarOpener', $('.open.sidebar', this.element));
    this.set('$sidebarClosers', $('.ui.sidebar', this.element).find('.item,a,.link,button').not('div.item.ui'));
    this.$sidebarClosers.push($('.main-container', this.element)[0]);

    if (this.$sidebarOpener) {
      this.$sidebarOpener.on('click', this.toggleSidebar.bind(this));
    }

    if (this.$sidebarClosers && this.$sidebarClosers.length > 0) {
      this.$sidebarClosers.on('click', this.hideSidebar.bind(this));
    }
  }

  willDestroyElement() {
    super.willDestroyElement(...arguments);
    if (this.$sidebarOpener) {
      this.$sidebarOpener.off('click', this.toggleSidebar.bind(this));
    }

    if (this.$sidebarClosers && this.$sidebarClosers.length > 0) {
      this.$sidebarClosers.off('click', this.hideSidebar.bind(this));
    }
  }
}

$(function() {
  $(window).on('scroll', function() {
    const menuPosition = $('#event-contents').offset()?.top;
    if ($(window).scrollTop() > menuPosition) {
      $('#public-event-content').addClass('menu-fixed');
    } else {
      $('#public-event-content').removeClass('menu-fixed');
    }
  });
});
