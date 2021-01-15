import classic from 'ember-classic-decorator';
import { layout as templateLayout } from '@ember-decorators/component';
import DefaultPagination from 'ember-models-table/components/models-table/row-sorting';
import layout from 'open-event-frontend/components/ui-table/header-row-sorting';

@classic
@templateLayout(layout)
export default class HeaderSortingRow extends DefaultPagination {}
