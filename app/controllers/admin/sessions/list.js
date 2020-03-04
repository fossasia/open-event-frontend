import Controller from '@ember/controller';
import { computed, action } from '@ember/object';
import EmberTableControllerMixin from 'open-event-frontend/mixins/ember-table-controller';

export default class extends Controller.extend(EmberTableControllerMixin) {
  @computed()
  get columns() {
    return [
      {
        name      : 'Event Name',
        valuePath : 'event.name'
      },
      {
        name            : 'Title',
        valuePath       : 'title',
        isSortable      : true,
        headerComponent : 'tables/headers/sort'
      },
      {
        name            : 'State',
        valuePath       : 'state',
        cellComponent   : 'ui-table/cell/events/view/sessions/cell-session-state',
        isSortable      : true,
        headerComponent : 'tables/headers/sort'
      },
      {
        name          : 'Speakers',
        valuePath     : 'speakers',
        cellComponent : 'ui-table/cell/cell-speakers'
      },
      {
        name            : 'Submitted At',
        valuePath       : 'submittedAt',
        cellComponent   : 'ui-table/cell/cell-simple-date',
        isSortable      : true,
        headerComponent : 'tables/headers/sort',
        options         : {
          dateFormat: 'MMMM DD, YYYY - hh:mm A'
        }
      },
      {
        name            : 'Starts At',
        valuePath       : 'startsAt',
        cellComponent   : 'ui-table/cell/cell-simple-date',
        isSortable      : true,
        headerComponent : 'tables/headers/sort',
        options         : {
          dateFormat: 'MMMM DD, YYYY - hh:mm A'
        }
      },
      {
        name            : 'Ends At',
        valuePath       : 'endsAt',
        cellComponent   : 'ui-table/cell/cell-simple-date',
        isSortable      : true,
        headerComponent : 'tables/headers/sort',
        options         : {
          dateFormat: 'MMMM DD, YYYY - hh:mm A'
        }
      },
      {
        name            : 'Actions',
        cellComponent   : 'ui-table/cell/cell-simple-buttons',
        valuePath       : 'id',
        extraValuePaths : ['event'],
        actions         : {
          deleteSession : this.deleteSession.bind(this),
          editSession   : this.editSession.bind(this),
          viewSession   : this.viewSession.bind(this)
        }
      }
    ];
  }

  @action
  async deleteSession(session_id) {
    this.set('isLoading', true);
    try {
      let session =  this.store.peekRecord('session', session_id, { backgroundReload: false });
      await session.destroyRecord();
      this.notify.success(this.l10n.t('Session has been deleted successfully.'),
        {
          id: 'session_deleted_succ'
        });
    } catch (e) {
      console.error('Error while deleting session', e);
      this.notify.error(this.l10n.t('An unexpected error has occurred.'),
        {
          id: 'unexpected_session_error'
        });
    }
    this.set('isLoading', false);
  }

  @action
  editSession(session_id, event_id) {
    this.transitionToRoute('events.view.sessions.edit', event_id, session_id);
  }

  @action
  viewSession(id) {
    this.transitionToRoute('my-sessions.view', id);
  }
}
