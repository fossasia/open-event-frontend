import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import Component from '@ember/component';
import { tagName } from '@ember-decorators/component';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { hasSessions, hasExhibitors } from 'open-event-frontend/utils/event';

@classic
@tagName('')
export default class SideMenu extends Component {
  @service('event') eventService;

  @tracked
  showSpeakers = null;

  @tracked
  showExhibitors = null;

  @tracked
  showSessions = null;

  async didInsertElement() {
    super.didInsertElement(...arguments);
    const speakersCall = await this.event.speakersCall;
    this.set('shouldShowCallforSpeakers',
      this.event.isCfsEnabled && speakersCall && speakersCall.announcement && (speakersCall.privacy === 'public'));

    this.checkSpeakers();
    this.checkSessions();
    this.checkExhibitors();
  }

  async checkSpeakers() {
    this.showSpeakers = this.showSpeakers ?? await this.eventService.hasSpeakers(this.event.id);
  }

  async checkExhibitors() {
    this.showExhibitors = this.showExhibitors ?? await hasExhibitors(this.loader, this.event);
  }

  async checkSessions() {
    this.showSessions = this.showSessions ?? await hasSessions(this.loader, this.event);
  }

  didRender() {
    if (!this.activeSection) { return }
    const target = document.querySelector(`[href='#${this.activeSection}']`);
    if (target) {
      // Delay click to give time to render
      setTimeout(() => {
        target.click();
      }, 0);
    }
  }

  @action
  goToSection(section) {
    this.set('activeSection', section);
    this.set('activeMenuSection', section);
    this.hideSidebar();
  }

  @action
  hideSidebar() {
    const target = document.querySelector('#main-container');
    if (target) {
      // Delay click to give time to render
      setTimeout(() => {
        target.click();
      }, 0);
    }
  }

  @action
  scrollToTarget(section) {
    if (!section) {return}
    const el = document.querySelector(`#${section}`);
    if (!el) {return}
    this.hideSidebar();
    const target = document.querySelector(`#${section}`);
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth'
      });
    }
    this.set('activeMenuSection', section);
    this.set('activeSection', null);
    document.querySelectorAll('.scroll').forEach(node => {
      node.classList.remove('active');
    });
    document.querySelector(`[href='#${section}']`).classList.add('active');
  }
}
