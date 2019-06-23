import Component from '@ember/component';
import { computed, action } from '@ember/object';

export default class extends Component {

  totalCount = 100;

  @computed()
  get currentRange() {
    return '1-10';
  }

  @computed()
  get pageCount() {
    return 10;
  }

  @action
  moveToNextPage() {
    this.incrementProperty('currentPage');
  }

  @action
  moveToPreviousPage() {
    this.decrementProperty('currentPage');
  }
}
