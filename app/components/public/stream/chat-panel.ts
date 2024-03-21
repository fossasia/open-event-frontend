import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import Event from 'open-event-frontend/models/event';
import { inject as service } from '@ember/service';
import Loader from 'open-event-frontend/services/loader';
import { action } from '@ember/object';

interface Args {
  event: Event
  shown: boolean
  currentRoom: any
}
export default class PublicStreamChatPanel extends Component<Args> {
  @service declare loader: Loader;

  @tracked loading = true;
  @tracked token = '';
  @tracked success = null;

  @action
  async setup(): Promise<void> {
    if (this.args.currentRoom.microlocationId && this.args.currentRoom && this.args.currentRoom.isChatEnabled) {
      const { success, token } = await this.loader.load(`/events/${this.args.event.id}/room/${this.args.currentRoom.microlocationId}/chat-token`);
      this.token = token;
      this.success = success;
      this.loading = false;
    } else if (this.args.currentRoom.id && this.args.currentRoom.data && this.args.currentRoom.data.isChatEnabled) {
      const { success, token } = await this.loader.load(`/events/${this.args.event.id}/virtual-room/${this.args.currentRoom.id}/chat-token`);
      this.token = token;
      this.success = success;
      this.loading = false;
    } else {
      const { success, token } = await this.loader.load(`/events/${this.args.event.id}/chat-token`);
      this.token = token;
      this.success = success;
      this.loading = false;
    }
  }
}
