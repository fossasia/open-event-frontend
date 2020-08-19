import Controller from '@ember/controller';
import { action, computed  } from '@ember/object';

export default class extends Controller {
  isTrackVisible = false;
  @action
  toggleTrack() {
    this.toggleProperty('isTrackVisible');
  }

  @computed('model.event.startsAt', 'model.event.endsAt')
  get allDates() {
    let arr = new Array();
    let difference = (this.model.event.endsAt).diff(this.model.event.startsAt, 'days');
    for (let i = 0; i <= Math.abs(difference); i++) {
    	arr.push(moment(this.model.event.startsAt).add(i,'days').toISOString());
    }
    return arr.toArray();
  }
}
