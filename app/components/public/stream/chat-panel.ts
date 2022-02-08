import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import Event from 'open-event-frontend/models/event';
import { inject as service } from '@ember/service';
import Loader from 'open-event-frontend/services/loader';
import { action } from '@ember/object';

interface Args {
  event: Event
  shown: boolean
}
export default class PublicStreamChatPanel extends Component<Args> {
  @service declare loader: Loader;

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
}
