import classic from 'ember-classic-decorator';
import Controller from '@ember/controller';
import { action } from '@ember/object';
@classic
export default class ScheduleController extends Controller {

    @action
  fullScreen() {
    const calendar = document.getElementById('fullscreen');
    if (!document.fullscreenElement) {
      calendar.requestFullscreen();
    }
  }
}
