import classic from 'ember-classic-decorator';
import Component from '@ember/component';
import { computed, action, get } from '@ember/object';

@classic
export default class Pagination extends Component {


  metaItemsCountProperty = 'count';

  @computed('currentPage', 'pageSize', 'totalContentLength')
  get currentRange() {
    const firstIndex = this.totalContentLength === 0 ? 0 : (this.currentPage - 1) * this.pageSize + 1;
    const lastIndex = (this.currentPage === this.pageCount || this.pageSize === 0) ? this.totalContentLength : this.currentPage * this.pageSize;
    return `${firstIndex} - ${lastIndex}`;
  }

  @computed('currentPage', 'pageSize', 'totalContentLength')
  get pageCount() {
    let totalPages = 1;
    if (parseInt(this.pageSize) !== 0 && this.pageSize < this.totalContentLength) {
      totalPages = parseInt(this.totalContentLength / this.pageSize);
      if (this.totalContentLength % this.pageSize) {
        totalPages += 1;
      }
    }
    return totalPages;
  }

  @computed('metaData')
  get totalContentLength() {
    return get(this.metaData, this.metaItemsCountProperty);
  }

  @computed('currentPage')
  get moveToPreviousPageDisabled() {
    return this.currentPage <= 1;

  }

  @computed('currentPage', 'pageCount')
  get moveToNextPageDisabled() {
    return this.currentPage >= this.pageCount;
  }

  @action
  moveToNextPage() {
    if (!this.moveToNextPageDisabled) {
      this.incrementProperty('currentPage');
    }
  }

  @action
  moveToPreviousPage() {
    if (!this.moveToPreviousPageDisabled) {
      this.decrementProperty('currentPage');
    }
  }

  @action
  moveToLastPage() {
    if (!this.moveToNextPageDisabled) {
      this.set('currentPage', this.pageCount);
    }
  }

  @action
  moveToFirstPage() {
    if (!this.moveToPreviousPageDisabled) {
      this.set('currentPage', 1);
    }
  }
}
