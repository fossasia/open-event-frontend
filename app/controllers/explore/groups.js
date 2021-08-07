import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import Controller from '@ember/controller';

@classic
export default class ExploreController extends Controller {
  queryParams = ['name'];
  name = null;

  @action
  clearFilter(filterType) {
    if (filterType === 'name') {
      this.set('name', null);
    }
  }

  @action
  clearAllFilters() {
    this.setProperties({
      name: null
    });
  }
}
