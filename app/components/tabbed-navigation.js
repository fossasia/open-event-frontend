import { tracked } from '@glimmer/tracking';
import classic from 'ember-classic-decorator';
import { classNames } from '@ember-decorators/component';
import { action, computed } from '@ember/object';
import $ from 'jquery';
import Component from '@ember/component';

@classic
@classNames('tabbed-navigation')
export default class TabbedNavigation extends Component {
  @tracked item = null;

  @computed('session.currentRouteName', 'item')
  get currentRoute() {
    return this.session.currentRouteName && this.item;
  }

  didInsertElement() {
    const { isMobile } = this.device;
    if (isMobile) {
      $('a', this.element).addClass('vertical-item');
    } else {
      $('a', this.element).removeClass('vertical-item');
    }
    this.set('item', $('a.active', this.element).text().trim());
  }

  didUpdate() {
    const { isMobile } = this.device;
    if (isMobile) {
      $('a', this.element).addClass('vertical-item');
    } else {
      $('a', this.element).removeClass('vertical-item');
    }
  }

  @action
  toggleMenu(mode) {
    const menu = $('div.menu', this.element);
    menu.toggleClass('hidden');
    if (mode === 'reset') {
      this.set('item', event.srcElement.text);
    }
  }
}
