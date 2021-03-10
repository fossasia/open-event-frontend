import Route from '@ember/routing/route';
import { inject as service } from '@ember/service'
import Event from 'open-event-frontend/models/event';
import Loader from 'open-event-frontend/services/loader';

export default class PublicStreamViewChat extends Route {
  @service declare l10n: any;
  @service declare loader: Loader;

  titleToken(): string {
    return this.l10n.t('Chat')
  }

  renderTemplate(): void {
    this.render('public/chat', { into: 'root' });
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
}
