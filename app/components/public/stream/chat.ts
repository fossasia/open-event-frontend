import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { action } from '@ember/object'
import Event from 'open-event-frontend/models/event';

interface Args {
  token: string,
  event: Event
}

export default class PublicStreamChat extends Component<Args> {
  @tracked iframeUrl: string | null = null;
  @service declare settings: any;

  @action
  init(): void {
    const roomName = this.args.event.name + this.args.event.identifier;
    this.iframeUrl = this.settings.rocketChatUrl + `/group/${roomName}?resumeToken=${this.args.token}`
  }
}
