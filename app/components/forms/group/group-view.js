import Component from '@ember/component';
import { action } from '@ember/object';
import classic from 'ember-classic-decorator';
import FormMixin from 'open-event-frontend/mixins/form';

@classic
export default class GroupView extends Component.extend(FormMixin) {
  @action
  shareEvent() {}
}
