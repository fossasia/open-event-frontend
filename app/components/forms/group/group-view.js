import Component from '@ember/component';
import { computed, action } from '@ember/object';
import classic from 'ember-classic-decorator';
import FormMixin from 'open-event-frontend/mixins/form';
import moment from 'moment';


@classic
export default class GroupView extends Component.extend(FormMixin) {

  @computed('events.[]', 'group.events.[]')
  get pastEvents() {
    return this.group.events.toArray().filter(event => { return moment(event.endsAt) < moment()});
  }

  @computed('events.[]', 'group.events.[]')
  get upcomingEvents() {
    return this.group.events.toArray().filter(event => { return moment(event.endsAt) > moment()});
  }

  @action
  shareEvent() {}
}
