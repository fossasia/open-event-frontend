import classic from 'ember-classic-decorator';
import { layout as templateLayout } from '@ember-decorators/component';
import DefaultPagination from 'ember-models-table/components/models-table/row-filtering';
import layout from 'open-event-frontend/components/ui-table/header-row-filtering';

@classic
@templateLayout(layout)
export default class HeaderFilteringRow extends DefaultPagination {}
