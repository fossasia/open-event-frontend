import { alias } from '@ember/object/computed';
import { computed, setProperties, set, get } from '@ember/object';
import { typeOf } from '@ember/utils';
import { run } from '@ember/runloop';
import { A } from '@ember/array';
import ModelsTable from 'open-event-frontend/components/ui-table';
import layout from 'open-event-frontend/templates/components/ui-table';
import { merge, kebabCase } from 'lodash';

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
    let itemsCountProperty = get(this, 'metaItemsCountProperty');
    let meta = get(this, 'filteredContent.meta') || {};
    return get(meta, itemsCountProperty) || 0;
  }),

  pagesCount: computed('router.currentURL', 'currentPageNumber', 'pageSize', function() {
    let itemsCountProperty = get(this, 'metaItemsCountProperty');
    let meta = get(this, 'filteredContent.meta') || {};
    let items = (get(meta, itemsCountProperty));
    let pageSize = get(this, 'pageSize');
    let pages = 0;
    if (pageSize > items) {
      this.$('.pagination').css({
        display: 'none'
      });
    } else {
      this.$('.pagination').removeAttr('style');
      pages = parseInt((items / pageSize));
      if (items % pageSize) {
        pages = pages + 1;
      }
    }
    return pages || 1;
  }),

  gotoForwardEnabled: computed('currentPageNumber', 'pagesCount', function() {
    let currentPageNumber = get(this, 'currentPageNumber');
    let pagesCount = get(this, 'pagesCount');
    return currentPageNumber < pagesCount;
  }),

  gotoBackwardEnabled: computed('currentPageNumber', function() {
    let currentPageNumber = get(this, 'currentPageNumber');
    return currentPageNumber > 1;
  }),

  lastIndex: computed('router.currentURL', 'pageSize', 'currentPageNumber', 'arrangedContentLength', function() {
    let pageMax = get(this, 'pageSize') * get(this, 'currentPageNumber');
    let itemsCount = get(this, 'arrangedContentLength');
    return Math.min(pageMax, itemsCount);
  }),

  _loadData() {
    let data = get(this, 'data');
    let currentPageNumber = get(this, 'currentPageNumber');
    let pageSize = get(this, 'pageSize');
    let columns = get(this, 'processedColumns');
    let sortProperties = get(this, 'sortProperties');
    let filterString = get(this, 'filterString');
    var query, store, modelName;

    if (!get(data, 'query')) {
      console.warn('You must use https://emberjs.com/api/data/classes/DS.Store.html#method_query for loading data');
      store = get(this, 'store');
      query = merge({}, get(this, 'query'));
      modelName = get(this, 'modelName');

    } else {
      query = merge({}, get(data, 'query'));
      store = get(data, 'store');
      modelName = get(data, 'type.modelName');
    }
    query.filter = JSON.parse(query.filter || '[]');
    query[get(this, 'filterQueryParameters.page')] = currentPageNumber;
    query[get(this, 'filterQueryParameters.pageSize')] = pageSize;

    let sort = sortProperties && get(sortProperties, 'firstObject');
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

    let globalFilter = get(this, 'customGlobalFilter');
    if (globalFilter) {
      if (filterString) {
        query.filter.pushObject({
          name : globalFilter,
          op   : 'ilike',
          val  : `%${filterString}%`
        });
      }
    } else {
      query.filter.removeObject({
        name : globalFilter,
        op   : 'ilike',
        val  : `%${filterString}%`
      });
    }

    columns.forEach(column => {
      let filter = get(column, 'filterString');
      let filterTitle = this.getCustomFilterTitle(column);

      if (filter) {
        query.filter.pushObject({
          name : filterTitle,
          op   : 'ilike',
          val  : `%${filter}%`
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

  pageSizeValues: computed(function() {
    return A([10, 25, 50, 100, 250, 'All']);
  }),

  actions: {

    gotoNext() {
      if (!get(this, 'gotoForwardEnabled')) {
        return;
      }
      let pagesCount = get(this, 'pagesCount');
      let currentPageNumber = get(this, 'currentPageNumber');
      if (pagesCount > currentPageNumber) {
        this.incrementProperty('currentPageNumber');
      }
    },

    gotoPrev() {
      if (!get(this, 'gotoBackwardEnabled')) {
        return;
      }
      let pagesCount = get(this, 'pagesCount');
      if (pagesCount > 1) {
        this.decrementProperty('currentPageNumber');
      }
    },

    gotoFirst() {
      if (!get(this, 'gotoBackwardEnabled')) {
        return;
      }
      set(this, 'currentPageNumber', 1);
    },

    gotoLast() {
      if (!get(this, 'gotoForwardEnabled')) {
        return;
      }
      let pagesCount = get(this, 'pagesCount');
      set(this, 'currentPageNumber', pagesCount);
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
    set(this, 'filteredContent', get(this, 'data'));
  },

  didInsertElement() {
    this._super(...arguments);

    if (!get(this, 'pageSize')) {
      set(this, 'pageSize', 10);
    }
  },

  _addPropertyObserver() {
    run.debounce(this, this._loadData, get(this, 'debounceDataLoadTime'));
  },

  willInsertElement() {
    this._super(...arguments);

    let observedProperties = get(this, 'observedProperties');
    observedProperties.forEach(propertyName => this.addObserver(propertyName, this._addPropertyObserver));
  },

  willDestroyElement() {
    this._super(...arguments);
    this.set('isLoading', false);
    this.set('isInitialLoad', true);
    let observedProperties = get(this, 'observedProperties');
    observedProperties.forEach(propertyName => this.removeObserver(propertyName));
  }
});
