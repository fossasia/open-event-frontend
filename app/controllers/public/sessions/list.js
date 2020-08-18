import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class extends Controller {
  isTrackVisible = false;
  @action
  toggleTrack() {
    this.toggleProperty('isTrackVisible');
  }
}
