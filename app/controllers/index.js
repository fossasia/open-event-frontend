import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import Controller from '@ember/controller';

@classic
export default class IndexController extends Controller {

  @action
  handleKeyPress() {
    if (event.code === 'Enter') {
      this.send('search');
    }
  }

  @action
  search() {
    this.transitionToRoute('explore', { queryParams: { event_name: this.event_name }});
  }

  @action
  shareEvent(event) {
    this.set('eventToShare', event);
    this.set('isShareModalOpen', true);
  }
}
