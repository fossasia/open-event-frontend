import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import Event from 'open-event-frontend/models/event';
import { inject as service } from '@ember/service';
import Loader from 'open-event-frontend/services/loader';
import { action } from '@ember/object';

interface Args {
  event: Event
}
export default class PublicStreamChatPanel extends Component<Args> {

  @service declare l10n: any;
  @service declare loader: Loader;
  @service router: any;
  @service confirm: any;
  @service session : any;
  @service authManager: any;

  @tracked shown = false;

  @tracked loading = true;
  @tracked token = '';
  @tracked success = null;

  @action
  async setup(): Promise<void> {
    const { success, token } = await this.loader.load(`/events/${this.args.event.id}/chat-token`);
    this.token = token;
    this.success = success;
    this.loading = false;
  }

  @action
  async showChatPanel(): Promise<void> {
    if (this.authManager.currentUser?.isRocketChatRegistered) {
      this.shown = true;
      return;
    }
    try {
      const heading = this.l10n.t('Please confirm that you understand and agree to the conditions of using the chat!');

      const content =  this.l10n.t('If you join the event chat, your profile name and image will be visible to other attendees. Other event attendees can also contact you directly.') + '<br/><br/>'
        + this.l10n.t('You may change your chat name and chat profile picture by going to account settings on the chat page on the top left.') + ' '
        + this.l10n.t('You need to minimize the side panel to access it.') + ' '
        + this.l10n.t('The feature integration is still in Alpha stage and currently your profile on the eventyay account page and on the chat are not linked and can be independently edited.') + ' '
        + this.l10n.t('When you change the chat settings you may receive additional email confirmations.') + '<br/><br/>'
        + this.l10n.t('Do you want to use the chat now?');

      const options = {
        denyText     : 'Cancel',
        denyColor    : 'red',
        approveText  : 'OK',
        approveColor : 'green',
        extra        : content
      }
      await this.confirm.prompt(heading, options);
      this.shown = true;
    } catch {
      this.shown = false;
    }
  }
}
