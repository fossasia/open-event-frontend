import classic from 'ember-classic-decorator';
import Component from '@ember/component';
import { computed } from '@ember/object';
import { groupBy } from 'lodash-es';
import { or } from '@ember/object/computed';

@classic
export default class AttendeeList extends Component {
  @computed('data.user')
  get buyer() {
    return this.data.user;
  }

  @computed('data.attendees')
  get holders() {
    return this.data.attendees;
  }

  @or('event.isBillingInfoMandatory', 'data.isBillingEnabled')
  showBillingInfo;

  @computed('fields.@each.form')
  get allFields() {
    return groupBy(this.fields.toArray(), field => field.form);
  }
}
