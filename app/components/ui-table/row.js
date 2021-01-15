import classic from 'ember-classic-decorator';
import { layout as templateLayout } from '@ember-decorators/component';
import DefaultPagination from 'ember-models-table/components/models-table/row';
import layout from 'open-event-frontend/components/ui-table/row';

@classic
@templateLayout(layout)
export default class Row extends DefaultPagination {}
