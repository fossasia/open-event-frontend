import classic from 'ember-classic-decorator';
import { layout as templateLayout } from '@ember-decorators/component';
import DefaultPagination from 'ember-models-table/components/models-table/grouped-header';
import layout from 'open-event-frontend/components/ui-table/header-rows-grouped';

@classic
@templateLayout(layout)
export default class HeaderGroupedRow extends DefaultPagination {}
