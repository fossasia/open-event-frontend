import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import { classNames } from '@ember-decorators/component';
import Component from '@ember/component';

@classic
@classNames('ui', 'fluid', 'card')
export default class GeneralInfo extends Component {
  @action
  openModal() {
    this.set('isEventRevisionModalOpen', true);
  }
}
