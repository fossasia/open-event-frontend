import Ember from 'ember';
import TableComponent from 'ember-models-table/components/models-table';
import layout from 'open-event-frontend/templates/components/ui-table';

const {
  set,
  getWithDefault,
  observer,
  Object: O
} = Ember;

const defaultMessages = {
  searchLabel            : 'Search:',
  searchPlaceholder      : 'Search',
  columnsTitle           : 'Columns',
  columnsShowAll         : 'Show All',
  columnsHideAll         : 'Hide All',
  columnsRestoreDefaults : 'Restore Defaults',
  tableSummary           : 'Show %@ - %@ of %@',
  allColumnsAreHidden    : 'All columns are hidden. Use <strong>columns</strong>-dropdown to show some of them',
  noDataToShow           : 'No records to show'
};

const defaultIcons = {
  sortAsc         : 'caret down icon',
  sortDesc        : 'caret up icon',
  columnVisible   : 'checkmark box icon',
  columnHidden    : 'square outline icon',
  navFirst        : 'chevron left icon',
  navPrev         : 'chevron left icon',
  navNext         : 'chevron right icon',
  navLast         : 'chevron right icon',
  caret           : 'caret',
  expandRow       : 'plus icon',
  expandAllRows   : 'plus icon',
  collapseRow     : 'minus icon',
  collapseAllRows : 'minus icon',
  selectAllRows   : 'checkmark box icon',
  deselectAllRows : 'square outline icon',
  selectRow       : 'checkmark box icon',
  deselectRow     : 'square outline icon'
};

const defaultCssClasses = {
  outerTableWrapper              : 'ui ui-table',
  innerTableWrapper              : 'ui segment column sixteen wide inner-table-wrapper',
  table                          : 'ui tablet stackable very basic table',
  globalFilterWrapper            : 'ui row',
  columnsDropdownWrapper         : 'right floated columns-dropdown',
  columnsDropdownButtonWrapper   : 'buttons',
  columnsDropdown                : 'ui dropdown right floated',
  theadCell                      : 'ui',
  theadCellNoSorting             : 'table-header-no-sorting',
  theadCellNoFiltering           : 'table-header-no-filtering',
  tfooterWrapper                 : 'table-footer ui stackable grid',
  footerSummary                  : 'text muted table-summary',
  footerSummaryNumericPagination : 'column four wide',
  footerSummaryDefaultPagination : 'column four wide',
  pageSizeWrapper                : 'ui column eight wide grid',
  pageSizeSelectWrapper          : 'left aligned',
  paginationWrapper              : 'ui column right floated',
  paginationWrapperNumeric       : 'column four wide',
  paginationWrapperDefault       : 'column four wide',
  buttonDefault                  : 'ui basic button',
  noDataCell                     : '',
  collapseRow                    : 'collapse-row',
  collapseAllRows                : 'collapse-all-rows',
  expandRow                      : 'expand-row',
  expandAllRows                  : 'expand-all-rows',
  thead                          : '',
  input                          : '',
  clearFilterIcon                : 'remove circle icon',
  clearAllFiltersIcon            : 'remove circle outline icon',
  globalFilterDropdownWrapper    : 'ui row stackable grid'
};

const assign = Object.assign || assign;

export default TableComponent.extend({
  layout,

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

  showColumnsDropdown: false,

  useFilteringByColumns: false,

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
