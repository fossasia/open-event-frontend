import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import Component from '@ember/component';
import { tagName } from '@ember-decorators/component';
import { tracked } from '@glimmer/tracking';
import { hasSpeakers, hasSessions } from 'open-event-frontend/utils/event';

@classic
@tagName('')
export default class SideMenu extends Component {

  @tracked
  showSpeakers = null;

  @tracked
  showSessions = null;

  async didInsertElement() {
    super.didInsertElement(...arguments);
    const speakersCall = await this.event.speakersCall;
    this.set('shouldShowCallforSpeakers',
      speakersCall && speakersCall.announcement && (speakersCall.privacy === 'public'));

    this.checkSpeakers();
    this.checkSessions();
  }

  async checkSpeakers() {
    this.showSpeakers = this.showSpeakers ?? await hasSpeakers(this.loader, this.event);
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
  }

  @action
  scrollToTarget(section) {
    document.querySelector(`#${section}`).scrollIntoView({
      behavior: 'smooth'
    });
    this.set('activeMenuSection', section);
    this.set('activeSection', null);
    document.querySelectorAll('.scroll').forEach(node => {
      node.classList.remove('active');
    });
    document.querySelector(`[href='#${section}']`).classList.add('active');
  }
}
