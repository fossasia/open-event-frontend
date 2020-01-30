import $ from 'jquery';
import { alias } from '@ember/object/computed';
import { computed, setProperties, set, get } from '@ember/object';
import { typeOf } from '@ember/utils';
import { run } from '@ember/runloop';
import { A } from '@ember/array';
import ModelsTable from 'open-event-frontend/components/ui-table';
import layout from 'open-event-frontend/templates/components/ui-table';
import { merge, kebabCase } from 'lodash-es';
import moment from 'moment';

export default ModelsTable.extend({

  layout,

  isLoading: false,

  isInitialLoad: true,

  isError: false,

  metaPagesCountProperty: 'page[size]',

  metaItemsCountProperty: 'count',

  debounceDataLoadTime: 500,

  filterQueryParameters: {
    globalFilter : 'contains',
    sort         : 'sort',
    page         : 'page[number]',
    pageSize     : 'page[size]'
  },

  observedProperties: ['currentPageNumber', 'pagesCount', 'sortProperties.[]', 'pageSize', 'filterString', 'processedColumns.@each.filterString'],

  filteredContent: [],

  visibleContent  : alias('arrangedContent'),
  arrangedContent : alias('filteredContent'),

  arrangedContentLength: computed('router.currentURL', 'filteredContent.meta', function() {
    let itemsCountProperty = this.metaItemsCountProperty;
    let meta = get(this, 'filteredContent.meta') || {};
    return get(meta, itemsCountProperty) || 0;
  }),

  pagesCount: computed('router.currentURL', 'currentPageNumber', 'pageSize', function() {
    let itemsCountProperty = this.metaItemsCountProperty;
    let meta = this.get('filteredContent.meta') || {};
    let items = (get(meta, itemsCountProperty));
    let pages = 0;
    if (this.pageSize > items) {
      $('.pagination', this.element).css({
        display: 'none'
      });
    } else {
      $('.pagination', this.element).removeAttr('style');
      pages = parseInt((items / this.pageSize));
      if (items % this.pageSize) {
        pages = pages + 1;
      }
    }
    return pages || 1;
  }),

  gotoForwardEnabled: computed('currentPageNumber', 'pagesCount', function() {
    return this.currentPageNumber < this.pagesCount;
  }),

  gotoBackwardEnabled: computed('currentPageNumber', function() {
    return this.currentPageNumber > 1;
  }),

  lastIndex: computed('router.currentURL', 'pageSize', 'currentPageNumber', 'arrangedContentLength', function() {
    let pageMax = this.pageSize * this.currentPageNumber;
    let itemsCount = this.arrangedContentLength;
    return Math.min(pageMax, itemsCount);
  }),

  _loadData() {
    let query, store, modelName;
    if (!get(this.data, 'query')) {
      console.warn('You must use https://emberjs.com/api/data/classes/DS.Store.html#method_query for loading data');
      query = merge({}, this.query);
      store = this.store;
      modelName = this.modelName;
    } else {
      query = merge({}, get(this.data, 'query'));
      store = get(this.data, 'store');
      modelName = get(this.data, 'type.modelName');
    }
    query.filter = JSON.parse(query.filter || '[]');
    query[get(this, 'filterQueryParameters.page')] = this.currentPageNumber;
    query[get(this, 'filterQueryParameters.pageSize')] = this.pageSize;

    let sort = this.sortProperties && get(this.sortProperties, 'firstObject');
    if (sort) {
      let [sortBy, sortDirection] = sort.split(':');
      query = this.sortingWrapper(query, sortBy, sortDirection.toUpperCase());
    } else {
      delete query[[get(this, 'filterQueryParameters.sort')]];
      delete query[[get(this, 'filterQueryParameters.sortDirection')]];
    }

    // let globalFilter = get(this, 'filterQueryParameters.globalFilter');
    // if (filterString) {
    //   query[globalFilter] = filterString;
    // } else {
    //   delete query[globalFilter];
    // }

    let globalFilter = this.customGlobalFilter;
    if (globalFilter) {
      if (this.filterString) {
        query.filter.pushObject({
          name : globalFilter,
          op   : 'ilike',
          val  : `%${this.filterString}%`
        });
      }
    } else {
      query.filter.removeObject({
        name : globalFilter,
        op   : 'ilike',
        val  : `%${this.filterString}%`
      });
    }

    this.processedColumns.forEach(column => {
      let filter = get(column, 'filterString');
      let filterTitle = this.getCustomFilterTitle(column);
      let filterHeading = this.getFilterHeading(column);
      let isMomentQuery = false;
      let queryParam;
      if (filterHeading && filterHeading === 'Date') {
        isMomentQuery = true;
        queryParam = moment(filter);
      }
      if (filter && !isMomentQuery) {
        query.filter.pushObject({
          name : filterTitle,
          op   : 'ilike',
          val  : `%${filter}%`
        });
      } else if (isMomentQuery && queryParam.isValid()) {
        query.filter.pushObject({
          name : filterTitle,
          op   : 'ge',
          val  : queryParam
        });
      } else {
        query.filter.removeObject({
          name : filterTitle,
          op   : 'ilike',
          val  : `%${filter}%`
        });
      }
    });
    if (!this.isInitialLoad) {
      if (!this.isDestroyed) {
        setProperties(this, { isLoading: true, isError: false });
      }
      store.query(modelName, query)
        .then(newData => setProperties(this, { isLoading: false, isError: false, filteredContent: newData }))
        .catch(() => {
          if (!this.isDestroyed) {
            setProperties(this, { isLoading: false, isError: true });
          }
        });
    } else {
      this.set('isInitialLoad', false);
    }
  },

  sortingWrapper(query, sortBy) {
    query[get(this, 'filterQueryParameters.sort')] = sortBy;
    // query[get(this, 'filterQueryParameters.sortDirection')] = sortDirection;

    return query;
  },

  getCustomFilterTitle(column) {
    return get(column, 'filteredBy') || get(column, 'propertyName');
  },

  getFilterHeading(column) {
    return get(column, 'title');
  },

  pageSizeValues: computed(function() {
    return A([10, 25, 50, 100, 250, 'All']);
  }),

  actions: {

    gotoNext() {
      if (!this.gotoForwardEnabled) {
        return;
      }
      if (this.pagesCount > this.currentPageNumber) {
        this.incrementProperty('currentPageNumber');
      }
    },

    gotoPrev() {
      if (!this.gotoBackwardEnabled) {
        return;
      }
      if (this.pagesCount > 1) {
        this.decrementProperty('currentPageNumber');
      }
    },

    gotoFirst() {
      if (!this.gotoBackwardEnabled) {
        return;
      }
      set(this, 'currentPageNumber', 1);
    },

    gotoLast() {
      if (!this.gotoForwardEnabled) {
        return;
      }
      this.set('currentPageNumber', this.pagesCount);
    },

    sort(column) {
      const sortMap = {
        none : 'asc',
        asc  : 'desc',
        desc : 'none'
      };
      const sortSign = {
        none : '',
        asc  : '-',
        desc : ''
      };
      let sortedBy = get(column, 'sortedBy');
      if (typeOf(sortedBy) === 'undefined' || typeOf(sortedBy) === 'null') {
        sortedBy = get(column, 'propertyName');
      }
      if (!sortedBy) {
        return;
      }

      sortedBy = kebabCase(sortedBy);
      let currentSorting = get(column, 'sorting');
      sortedBy = `${sortSign[currentSorting]}${sortedBy}`;
      let newSorting = sortMap[currentSorting.toLowerCase()];
      let sortingArgs = [column, sortedBy, newSorting];
      this._singleColumnSorting(...sortingArgs);
    }

  },

  didReceiveAttrs() {
    set(this, 'pageSize', 10);
    set(this, 'currentPageNumber', 1);
    set(this, 'filteredContent', this.data);
  },

  didInsertElement() {
    this._super(...arguments);

    if (!this.pageSize) {
      this.set('pageSize', 10);
    }
  },

  _addPropertyObserver() {
    run.debounce(this, this._loadData, this.debounceDataLoadTime);
  },

  willInsertElement() {
    this._super(...arguments);
    this.observedProperties.forEach(propertyName => this.addObserver(propertyName, this._addPropertyObserver));
  },

  willDestroyElement() {
    this._super(...arguments);
    this.set('isLoading', false);
    this.set('isInitialLoad', true);
    this.observedProperties.forEach(propertyName => this.removeObserver(propertyName));
  }
});
