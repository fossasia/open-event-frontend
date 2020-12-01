import classic from 'ember-classic-decorator';
import { action, computed } from '@ember/object';
import Controller from '@ember/controller';
import moment from 'moment';
import $ from 'jquery';

@classic
export default class SessionsController extends Controller {

  queryParams = ['sort'];
  sort = 'starts-at';
  isTrackVisible = false;
  timezone = null;

  constructor(...args) {
    super(...args);

    this.addObserver('model.session', this, 'sessionChanged');
  }

  @action
  sessionChanged() {
    this.set('preserveScrollPosition', true);
    $('html,body').animate({
      scrollTop: $('#session-heading').offset()?.top
    });
  }

  @computed('model.event.startsAt', 'model.event.endsAt', 'timezone')
  get allDates() {
    const arr = [];
    const difference = (this.model.event.endsAt).diff(this.model.event.startsAt, 'days');
    for (let i = 0; i <= Math.abs(difference); i++) {
      arr.push(moment.tz(this.model.event.startsAt, this.timezone).add(i, 'days').toISOString());
    }
    return arr;
  }
}
