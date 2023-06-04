import Component from '@ember/component';
import { action } from '@ember/object';
import { debounce } from '@ember/runloop';
import classic from 'ember-classic-decorator';

@classic
export default class ExpandableSearchBox extends Component {

  debouncePeriod = 1000 // 1 second
  isExpanded = false

  setSearchQueryLazily(value) {
    this.set('searchQuery', value);
  }

  @action
  toggleSearch() {
    this.toggleProperty('isExpanded');
  }

  @action
  setSearchQuery(value) {
    debounce(this, this.setSearchQueryLazily, value, this.debouncePeriod);
  }

}
