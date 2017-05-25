import Ember from 'ember';
import TableComponent from './models-table';

const {
  set,
  getWithDefault,
  observer,
  Object: O
} = Ember;

const defaultMessages = {
  searchLabel: 'Search:',
  searchPlaceholder: '',
  'columns-title': 'Columns',
  'columns-showAll': 'Show All',
  'columns-hideAll': 'Hide All',
  'columns-restoreDefaults': 'Restore Defaults',
  tableSummary: 'Show %@ - %@ of %@',
  allColumnsAreHidden: 'All columns are hidden. Use <strong>columns</strong>-dropdown to show some of them',
  noDataToShow: 'No records to show'
};

const defaultIcons = {
  'sort-asc': 'caret down icon',
  'sort-desc': 'caret up icon',
  'column-visible': 'checkmark box icon',
  'column-hidden': 'square outline icon',
  'nav-first': 'chevron left icon',
  'nav-prev': 'chevron left icon',
  'nav-next': 'chevron right icon',
  'nav-last': 'chevron right icon',
  'caret': 'caret',
  'expand-row': 'plus icon',
  'expand-all-rows': 'plus icon',
  'collapse-row': 'minus icon',
  'collapse-all-rows': 'minus icon',
  'select-all-rows': 'glyphicon glyphicon-check',
  'deselect-all-rows': 'glyphicon glyphicon-unchecked',
  'select-row': 'glyphicon glyphicon-check',
  'deselect-row': 'glyphicon glyphicon-unchecked'
};

const defaultCssClasses = {
  outerTableWrapper: '',
  innerTableWrapper: 'inner-table-wrapper',
  table: 'ui tablet stackable very basic table',
  globalFilterWrapper: 'right floated',
  columnsDropdownWrapper: 'right floated columns-dropdown',
  columnsDropdownButtonWrapper: 'buttons',
  columnsDropdown: 'ui dropdown right floated',
  theadCell: 'ui',
  theadCellNoSorting: 'table-header-no-sorting',
  theadCellNoFiltering: 'table-header-no-filtering',
  tfooterWrapper: 'table-footer ui grid',
  footerSummary: 'table-summary',
  footerSummaryNumericPagination: 'column four wide',
  footerSummaryDefaultPagination: 'column four wide',
  pageSizeWrapper: 'column two wide',
  pageSizeSelectWrapper: 'right floated',
  paginationWrapper: 'ui right floated pagination menu',
  paginationWrapperNumeric: 'column four wide',
  paginationWrapperDefault: 'column four wide',
  buttonDefault: 'ui basic button',
  noDataCell: '',
  collapseRow: 'collapse-row',
  collapseAllRows: 'collapse-all-rows',
  expandRow: 'expand-row',
  expandAllRows: 'expand-all-rows',
  thead: '',
  input: 'form-control',
  clearFilterIcon: 'glyphicon glyphicon-remove-sign form-control-feedback',
  clearAllFiltersIcon: 'glyphicon glyphicon-remove-circle',
  globalFilterDropdownWrapper: ''
};

const assign = Object.assign || Ember.assign;

export default TableComponent.extend({
  useFilteringByColumns: false,
  showTableFooter: false,
  showGlobalFilter: false,
  showColumnsDropdown: false,

  _setupMessages: observer('customMessages', function() {
    const customIcons = getWithDefault(this, 'customMessages', {});
    let newMessages = {};
    assign(newMessages, defaultMessages, customIcons);
    set(this, 'messages', O.create(newMessages));
  }),

  _setupIcons() {
    const customIcons = getWithDefault(this, 'customIcons', {});
    let newIcons = {};
    assign(newIcons, defaultIcons, customIcons);
    set(this, 'icons', O.create(newIcons));
  },

  _setupClasses() {
    const customClasses = getWithDefault(this, 'customClasses', {});
    let newClasses = {};
    assign(newClasses, defaultCssClasses, customClasses);
    set(this, 'classes', O.create(newClasses));
  },

  simplePaginationTemplate: 'components/ui-table/simple-pagination',

  numericPaginationTemplate: 'components/ui-table/numeric-pagination',

  tableFooterTemplate: 'components/ui-table/table-footer',

  componentFooterTemplate: 'components/ui-table/component-footer',

  pageSizeTemplate: 'components/ui-table/page-size',

  showPageSize: true,

  globalFilterTemplate: 'components/ui-table/global-filter',

  columnsDropdownTemplate: 'components/ui-table/columns-dropdown',

  headerSortingRowTemplate: 'components/ui-table/header-row-sorting',

  headerSortingIconsTemplate: 'components/ui-table/header-sorting-icons',

  headerFilteringRowTemplate: 'components/ui-table/header-row-filtering',

  headerGroupedRowsTemplate: 'components/ui-table/header-rows-grouped',

  rowTemplate: 'components/ui-table/row',

  expandedRowTemplate: 'components/ui-table/expanded-row',

  noDataShowTemplate: 'components/ui-table/no-data',

  allColumnsHiddenTemplate: 'components/ui-table/all-columns-hidden'
});
