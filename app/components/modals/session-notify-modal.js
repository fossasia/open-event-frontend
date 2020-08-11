import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import ModalBase from 'open-event-frontend/components/modals/modal-base';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

let mailPromise = null;

@classic
export default class SessionNotifyModal extends ModalBase {
  @service loader;
  @tracked mails = null;
  @tracked saving = false;

  constructor() {
    super(...arguments);
    this.initialize();
  }

  get loading() {
    return !this.mails || this.saving;
  }

  get mail() {
    return this.mails[this.sessionState];
  }

  async initialize() {
    if (!mailPromise) {
      mailPromise = this.loader.load('/sessions/mails');
    }
    this.mails = await mailPromise;
  }

  @action
  notifySession() {
    console.log('>>> Notify');
  }

}
