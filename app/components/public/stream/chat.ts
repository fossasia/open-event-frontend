import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { action } from '@ember/object'

interface Args {
  token: string,
  embedded: Boolean
}

export default class PublicStreamChat extends Component<Args> {
  @tracked iframeUrl: string | null = null;
  @service declare settings: any;

  @action
  init(): void {
    if(this.args.embedded) {
      this.iframeUrl = this.settings.rocketChatUrl + '/channel/general?resumeToken=' + this.args.token + '&layout=embedded'
    } else {
      this.iframeUrl = this.settings.rocketChatUrl + '/channel/general?resumeToken=' + this.args.token
    }
}
}
