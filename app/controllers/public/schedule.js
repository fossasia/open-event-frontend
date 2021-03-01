import classic from 'ember-classic-decorator';
import Controller from '@ember/controller';
import { action } from '@ember/object';
@classic
export default class ScheduleController extends Controller {

    @action
    fullScreen() {
        let elem = document.getElementById("fullscreen");
        if (!document.fullscreenElement) {
            elem.requestFullscreen().catch(err => {
              alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
            });
          } else {
            document.exitFullscreen();
          }
    }
}
