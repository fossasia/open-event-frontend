import Mixin from '@ember/object/mixin';
import { getOwner } from '@ember/application';

export default Mixin.create({
  queryParams : ['page', 'per_page', 'search', 'sort_dir', 'sort_by'],
  page        : 1,
  per_page    : 10,
  search      : null,
  sort_dir    : null,
  sort_by     : null,
  sorts       : [],

  /*
    Refreshes the current model, with latest data from API server without reloading
    the entire page.
    Requires correct context.
    Usage example inside a controller:
    this.refreshModel.bind(this)()
   */

  refreshModel() {
    getOwner(this).lookup(`route:${this.router.currentRoute.name}`).refresh();
  }
});
