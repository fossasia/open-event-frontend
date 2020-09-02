import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class extends Controller {
  @action
  shareEvent(event) {
    this.set('eventToShare', event);
    this.set('isShareModalOpen', true);
  }
}
