import classic from 'ember-classic-decorator';
import { computed } from '@ember/object';
import Controller from '@ember/controller';

@classic
export default class SessionsController extends Controller {
	@computed('model.event.startsAt')
  get isStart() {
    return this.model.event.startsAt;
  }
}
