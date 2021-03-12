import Route from '@ember/routing/route';
import { inject as service } from '@ember/service'
import Event from 'open-event-frontend/models/event';
import Loader from 'open-event-frontend/services/loader';
import { action }  from '@ember/object';

export default class PublicStreamViewChat extends Route {
  @service declare l10n: any;
  @service declare loader: Loader;
  @service router: any;
  @service confirm: any;
  @service session : any;

  titleToken(): string {
    return this.l10n.t('Chat')
  }

  renderTemplate(): void {
    this.render('public/chat', { into: 'root' });
  }

  async beforeModel(): Promise<void> {
    try {
      const heading = 'Please confirm you understand and agree to the conditions of using the chat!'

      const content =  'If you join the event chat your profile name and image will be visible to other attendees. Other event attendees can also contact you directly.<br/><br/>'
        + 'You may change your chat name and chat profile picture by going to account settings on the chat page on the top left. '
        + 'You need to minimize the side panel to access it. '
        + 'The feature integration is still in Alpha stage and currently your profile on the eventyay account page and on the chat are not linked and can be independently edited. '
        + 'When you change the chat settings you may receive additional email confirmations.<br/><br/>'
        + 'Do you want to use the chat now?'

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
