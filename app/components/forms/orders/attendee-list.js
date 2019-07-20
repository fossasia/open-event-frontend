import Component from '@ember/component';
import { computed } from '@ember/object';
import { groupBy } from 'lodash-es';
import { or } from '@ember/object/computed';

export default class extends Component {
  @computed('data.user')
  get buyer() {
    return this.data.user;
  }

  @computed('data.attendees')
  get holders() {
    return this.data.attendees;
  }

  @computed('data.amount', 'data.isBillingEnabled')
  get showBillingInfo() {
    return or('data.amount', 'data.isBillingEnabled');
  }

  @computed('fields.@each.form')
  get allFields() {
    return groupBy(this.fields.toArray(), field => field.get('form'));
  }
}
