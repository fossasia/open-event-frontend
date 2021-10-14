import Controller from '@ember/controller';

export default class extends Controller {
  queryParams = ['search'];
  search = null;
  preserveScrollPosition = true;
}
