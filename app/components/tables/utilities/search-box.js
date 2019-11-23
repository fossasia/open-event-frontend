import Component from '@ember/component';
import { debounce } from '@ember/runloop';
import { action } from '@ember/object';

export default class extends Component {

  debouncePeriod = 1000 // 1 second

  setSearchQueryLazily(value) {
    this.set('searchQuery', value);
  }

  @action
  setSearchQuery(value) {
    debounce(this, this.setSearchQueryLazily, value, this.debouncePeriod);
  }

}
