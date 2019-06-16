import Default from 'ember-models-table/themes/semanticui';


export default Default.extend({
  components: {
    'pagination-simple'    : 'components/ui-table/simple-pagination',
    'numericPagination'    : 'components/ui-table/numeric-pagination',
    'table-footer'         : 'components/ui-table/table-footer',
    'footer'               : 'components/ui-table/component-footer',
    'pageSizeSelect'       : 'components/ui-table/page-size',
    'global-filter'        : 'components/ui-table/global-filter',
    'columns-dropdown'     : 'components/ui-table/columns-dropdown',
    'row-sorting'          : 'components/ui-table/header-row-sorting',
    'row-filtering'        : 'components/ui-table/header-row-filtering',
    'grouped-header'       : 'components/ui-table/header-grouped-row',
    'row'                  : 'components/ui-table/row',
    'expandedRowComponent' : 'expanded-row',
    'no-data'              : 'components/ui-table/no-data',
    'columns-hidden'       : 'components/ui-table/all-columns-hidden'
  },

  classes: {
    outerTableWrapper              : 'ui unstackable ui-table',
    innerTableWrapper              : 'ui segment column sixteen wide inner-table-wrapper',
    table                          : 'ui very basic unstackable table',
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
  },

  icons: {
    sortAsc         : 'caret down icon',
    sortDesc        : 'caret up icon',
    columnVisible   : 'checkmark box icon',
    columnHidden    : 'square outline icon',
    navFirst        : 'angle double left large icon',
    navPrev         : 'angle left large icon',
    navNext         : 'angle right large icon',
    navLast         : 'angle double right large icon',
    caret           : 'caret',
    expandRow       : 'plus icon',
    expandAllRows   : 'plus icon',
    collapseRow     : 'minus icon',
    collapseAllRows : 'minus icon',
    selectAllRows   : 'checkmark box icon',
    deselectAllRows : 'square outline icon',
    selectRow       : 'checkmark box icon',
    deselectRow     : 'square outline icon'
  },

  messages: {
    searchLabel            : 'Search:',
    searchPlaceholder      : 'Search',
    columnsTitle           : 'Columns',
    columnsShowAll         : 'Show All',
    columnsHideAll         : 'Hide All',
    columnsRestoreDefaults : 'Restore Defaults',
    tableSummary           : 'Show %@ - %@ of %@',
    allColumnsAreHidden    : 'All columns are hidden. Use <strong>columns</strong>-dropdown to show some of them',
    noDataToShow           : 'No records to show'
  }
});
