import classic from 'ember-classic-decorator';
import Controller from '@ember/controller';
import { action, computed } from '@ember/object';
@classic
export default class ScheduleController extends Controller {
  preserveScrollPosition = true;

  @action
  fullScreen() {
    const calendar = document.getElementById('fullscreen');
    if (!document.fullscreenElement) {
      calendar.requestFullscreen();
    }
  }

  @computed('model.microlocations')
  get microlocations() {
    return this.model.microlocations.filter(room => !room.hiddenInScheduler);
  }
}
