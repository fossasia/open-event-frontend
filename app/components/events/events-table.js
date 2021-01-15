import classic from 'ember-classic-decorator';
import { classNames } from '@ember-decorators/component';
import UiTable from 'open-event-frontend/components/ui-table-server';

@classic
@classNames('ui', 'main-container')
export default class EventsTable extends UiTable {}
