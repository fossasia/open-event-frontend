import Route from '@ember/routing/route';
import { inject as service } from '@ember/service'
import Event from 'open-event-frontend/models/event';
import VideoStream from 'open-event-frontend/models/video-stream';
import Loader from 'open-event-frontend/services/loader';

export default class PublicStreamViewChat extends Route {
  @service declare l10n: any;
  @service declare loader: Loader;

  titleToken(): string {
    return this.l10n.t('Chat')
  }

  renderTemplate(): void {
    this.render('public/stream/view/chat', { into: 'root' });
  }

  async model(): Promise<{event: Event, stream: VideoStream, success: boolean, token: string}> {
    const { event, stream } = this.modelFor('public.stream.view') as any;

    const { success, token } = await this.loader.load(`/video-streams/${stream.id}/chat-token`);

    return {
      event,
      stream,
      success,
      token
    };
  }
}
