import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class CellNotify extends Component {
  @tracked isModalOpen = false;

  @action
  openModal() {
    this.isModalOpen = true;
  }
}
