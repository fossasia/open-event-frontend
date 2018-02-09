import Ember from 'ember';
import ModelsTable from 'open-event-frontend/components/ui-table';
import layout from 'open-event-frontend/templates/components/ui-table';

const {
  get,
  set,
  setProperties,
  computed,
  typeOf,
  run,
  A,
  $: { extend },
  Logger: { warn }
} = Ember;

export default ModelsTable.extend({

  layout,

  isLoading: false,

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

  observedProperties: ['currentPageNumber', 'sortProperties.[]', 'pageSize', 'filterString', 'processedColumns.@each.filterString'],

  filteredContent: [],

  visibleContent  : computed.alias('arrangedContent'),
  arrangedContent : computed.alias('filteredContent'),

  arrangedContentLength: computed('routing.router.currentURL', 'filteredContent.meta', function() {
    let itemsCountProperty = get(this, 'metaItemsCountProperty');
    let meta = get(this, 'filteredContent.meta') || {};
    return get(meta, itemsCountProperty) || 0;
  }),

  pagesCount: computed('routing.router.currentURL', 'currentPageNumber', 'pageSize', function() {
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
    return pages;
  }),

  lastIndex: computed('routing.router.currentURL', 'pageSize', 'currentPageNumber', 'arrangedContentLength', function() {
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

    if (!get(data, 'query')) {
      warn('You must use http://emberjs.com/api/data/classes/DS.Store.html#method_query for loading data');
      return;
    }
    let query = extend({}, get(data, 'query'));
    let store = get(data, 'store');
    let modelName = get(data, 'type.modelName');
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

    let globalFilter = get(this, 'filterQueryParameters.globalFilter');
    if (filterString) {
      query[globalFilter] = filterString;
    } else {
      delete query[globalFilter];
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

    setProperties(this, { isLoading: true, isError: false });
    store.query(modelName, query)
      .then(newData => setProperties(this, { isLoading: false, isError: false, filteredContent: newData }))
      .catch(() => setProperties(this, { isLoading: false, isError: true }));
  },

  sortingWrapper(query, sortBy, sortDirection) {
    query[get(this, 'filterQueryParameters.sort')] = sortBy;
    query[get(this, 'filterQueryParameters.sortDirection')] = sortDirection;

    return query;
  },

  getCustomFilterTitle(column) {
    return get(column, 'filteredBy') || get(column, 'propertyName');
  },

  pageSizeValues: computed(function() {
    return A([10, 25, 50]);
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
      if (typeOf(sortedBy) === 'undefined') {
        sortedBy = get(column, 'propertyName');
      }
      if (!sortedBy) {
        return;
      }

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

    let observedProperties = get(this, 'observedProperties');
    observedProperties.forEach(propertyName => this.removeObserver(propertyName));
  }
});
