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

  @service loader!: Loader;

  @tracked shown = false;

  @tracked token = '';

  @tracked success = false;

  @action
  async setup(): Promise<void> {
    const { success, token } = await this.loader.load(`/events/${this.args.event.id}/chat-token`);
    this.token = token;
    this.success = success;
  }

}
