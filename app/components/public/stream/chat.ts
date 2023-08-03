import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { action } from '@ember/object'
import Event from 'open-event-frontend/models/event';

interface Args {
  token: string,
  embedded: boolean,
  event: Event,
  currentRoom: any,
}

export default class PublicStreamChat extends Component<Args> {
  @tracked iframeUrl: string | null = null;
  @service declare settings: any;

  @action
  init(): void {
    let room_name = this.args.event.chatRoomName;
    if (this.args.currentRoom && this.args.currentRoom.isChatEnabled) {
      room_name = this.args.currentRoom.chatRoomName
    }
    this.iframeUrl = this.settings.rocketChatUrl + `/group/${room_name}?resumeToken=${this.args.token}` + (this.args.embedded ? '&layout=embedded' : '');
  }
}
