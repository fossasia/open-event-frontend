import Route from '@ember/routing/route';
import { inject as service } from '@ember/service'
import Event from 'open-event-frontend/models/event';
import Loader from 'open-event-frontend/services/loader';
import { action }  from '@ember/object';

export default class PublicStreamViewChat extends Route {
  @service settings: any;
  @service declare l10n: any;
  @service declare loader: Loader;
  @service router: any;
  @service confirm: any;
  @service session : any;
  @service authManager: any;

  titleToken(): string {
    return this.l10n.t('Chat')
  }

  renderTemplate(): void {
    this.render('public/chat', { into: 'root' });
  }

  async beforeModel(): Promise<void> {
    if (this.authManager.currentUser?.isRocketChatRegistered) {
      return;
    }
    try {
      const heading = this.l10n.t('Please confirm that you understand and agree to the conditions of using the chat!');

      const content =  this.l10n.t('If you join the event chat, your profile name and image will be visible to other attendees. Other event attendees can also contact you directly.') + '<br/><br/>'
        + this.l10n.t('You may change your chat name and chat profile picture by going to account settings on the chat page on the top left.') + ' '
        + this.l10n.t('You need to minimize the side panel to access it.') + ' '
        + this.l10n.t('The feature integration is still in Alpha stage and currently your profile on the + this.settings.appName + account page and on the chat are not linked and can be independently edited.') + ' '
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
    } catch {
      this.router.transitionTo('public');
    }
  }

  async model(): Promise<{event: Event, success: boolean, token: string}> {
    const event = this.modelFor('public') as Event;

    const { success, token } = await this.loader.load(`/events/${event.id}/chat-token`);

    return {
      event,
      success,
      token
    };
  }

  @action
  error(error: any, transition: any): void | boolean { // eslint-disable-line @typescript-eslint/explicit-module-boundary-types
    if (this.session.isAuthenticated || error.status === 401) {
      this.transitionTo('public', transition.resolvedModels.public, { queryParams: { video_dialog: true } });
    } else {
      return true;
    }
  }
}
