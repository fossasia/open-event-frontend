import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { action } from '@ember/object'
import Event from 'open-event-frontend/models/event';

interface Args {
  token: string,
  embedded: boolean,
  event: Event
}

export default class PublicStreamChat extends Component<Args> {
  @tracked iframeUrl: string | null = null;
  @service declare settings: any;

  @action
  init(): void {
    this.iframeUrl = this.settings.rocketChatUrl + `/group/${this.args.event.chatRoomName}?resumeToken=${this.args.token}` + (this.args.embedded ? '&layout=embedded' : '');
  }
}
