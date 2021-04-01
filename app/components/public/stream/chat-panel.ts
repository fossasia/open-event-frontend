import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class PublicStreamChatPanel extends Component {

  @tracked shown = false;
  @tracked loading = false;
  @tracked showChat = false;
}
