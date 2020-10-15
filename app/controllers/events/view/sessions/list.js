import Controller from '@ember/controller';
import { action } from '@ember/object';
import { mapBy } from '@ember/object/computed';
import EmberTableControllerMixin from 'open-event-frontend/mixins/ember-table-controller';

export default class extends Controller.extend(EmberTableControllerMixin) {
  @mapBy('model.feedbacks', 'session.id') ratedSessions;

  get columns() {
    return [
      {
        name            : 'State',
        headerComponent : 'tables/headers/sort',
        cellComponent   : 'ui-table/cell/events/view/sessions/cell-buttons',
        width           : 75,
        valuePath       : 'state',
        isSortable      : true,
        extraValuePaths : ['id', 'status'],
        options         : {
          sessionStateMap: this.model.sessionStateMap
        },
        actions: {
          changeState: this.changeState.bind(this)
        }
      },
      {
        name            : 'Title',
        valuePath       : 'title',
        width           : 230,
        extraValuePaths : ['id', 'event', 'isLocked'],
        isSortable      : true,
        headerComponent : 'tables/headers/sort',
        cellComponent   : 'ui-table/cell/events/view/sessions/cell-session-title',
        actions         : {
          viewSession   : this.viewSession.bind(this),
          editSession   : this.editSession.bind(this),
          deleteSession : this.deleteSession.bind(this)
        }
      },
      {
        name          : 'Speakers',
        width         : 70,
        valuePath     : 'speakers',
        cellComponent : 'ui-table/cell/cell-speakers'
      },
      {
        name            : 'Rating',
        width           : 60,
        valuePath       : 'id',
        extraValuePaths : ['feedbacks'],
        cellComponent   : 'ui-table/cell/events/view/sessions/cell-rating',
        options         : {
          ratedSessions: this.ratedSessions
        },
        actions: {
          updateRating : this.updateRating.bind(this),
          addRating    : this.addRating.bind(this)
        }
      },
      {
        name      : 'Track',
        width     : 80,
        valuePath : 'track.name'
      },
      {
        name      : 'Type',
        width     : 70,
        valuePath : 'sessionType.name'
      },
      {
        name          : 'Submission Date',
        width         : 90,
        valuePath     : 'submittedAt',
        cellComponent : 'ui-table/cell/cell-simple-date',
        options       : {
          dateFormat: 'MMMM DD, YYYY - HH:mm'
        }
      },
      {
        name          : 'Last Modified',
        width         : 90,
        valuePath     : 'lastModifiedAt',
        cellComponent : 'ui-table/cell/cell-simple-date',
        options       : {
          dateFormat: 'MMMM DD, YYYY - HH:mm'
        }
      },
      {
        name            : 'Notify',
        valuePath       : 'id',
        width           : 40,
        extraValuePaths : ['status'],
        cellComponent   : 'ui-table/cell/events/view/sessions/cell-notify'
      },
      {
        name            : 'Lock Session',
        valuePath       : 'id',
        width           : 40,
        extraValuePaths : ['isLocked'],
        cellComponent   : 'ui-table/cell/events/view/sessions/cell-lock-session',
        actions         : {
          lockSession: this.lockSession.bind(this)
        }
      }
    ];
  }

  @action
  async deleteSession(session_id) {
    this.set('isLoading', true);
    const session =  this.store.peekRecord('session', session_id, { backgroundReload: false });
    session.destroyRecord()
      .then(() => {
        this.notify.success(this.l10n.t('Session has been deleted successfully.'),
          {
            id: 'session_del_tab'
          });
        this.refreshModel.bind(this)();
      })
      .catch(() => {
        this.notify.error(this.l10n.t('An unexpected error has occurred.'),
          {
            id: 'session_unex_del'
          });
      })
      .finally(() => {
        this.set('isLoading', false);
      });
  }

  @action
  editSession(session_id, event_id) {
    this.transitionToRoute('events.view.sessions.edit', event_id, session_id);
  }

  @action
  viewSession(session_id, event_id) {
    this.transitionToRoute('public.session.view', event_id, session_id);
  }

  @action
  async lockSession(session_id, lock) {
    const session =  this.store.peekRecord('session', session_id, { backgroundReload: false });
    const { isLocked } = session;
    session.set('isLocked', lock);
    this.set('isLoading', true);
    const lockMessage = lock ? 'locked' : 'unlocked';
    try {
      await session.save();
      this.notify.success(this.l10n.t(`Session has been ${ lockMessage } successfully.`),
        {
          id: 'session_lock'
        });
      this.refreshModel.bind(this)();
    } catch (e) {
      session.set('isLocked', isLocked);
      console.error('Error while changing session lock in organizer session list', e);
      this.notify.error(this.l10n.t('An unexpected error has occurred.'),
        {
          id: 'session_unexpected_lock'
        });
    } finally {
      this.set('isLoading', false);
    }
  }

  @action
  async changeState(session_id, state) {
    const session =  this.store.peekRecord('session', session_id, { backgroundReload: false });
    const oldState = session.state;
    session.set('state', state);
    this.set('isLoading', true);

    try {
      await session.save();
      const message = `Session has been ${state}`;
      this.notify.success(this.l10n.t(message), {
        id: 'session_state'
      });
      this.refreshModel.bind(this)();
    } catch (e) {
      session.set('state', oldState);
      console.error('Error while changing session state in organizer session list', e);
      this.notify.error(this.l10n.t('An unexpected error has occurred.'), {
        id: 'session_state_unexpected'
      });
    } finally {
      this.set('isLoading', false);
    }
  }

  @action
  updateRating(rating, feedback) {
    this.set('isLoading', true);
    if (rating) {
      feedback.set('rating', rating);
      feedback.save()
        .then(() => {
          this.notify.success(this.l10n.t('Session feedback has been updated successfully.'),
            {
              id: 'session_feedback'
            });
          this.refreshModel.bind(this)();
        })
        .catch(() => {
          this.notify.error(this.l10n.t('An unexpected error has occurred.'),
            {
              id: 'session_feedback_error'
            });
        })
        .finally(() => {
          this.set('isLoading', false);
        });
    } else {
      feedback.destroyRecord()
        .then(() => {
          this.notify.success(this.l10n.t('Session feedback has been updated successfully.'),
            {
              id: 'session_feed_update'
            });
          this.refreshModel.bind(this)();
        })
        .catch(() => {
          this.notify.error(this.l10n.t('An unexpected error has occurred.'),
            {
              id: 'session_feed_error'
            });
        })
        .finally(() => {
          this.set('isLoading', false);
        });
    }
  }

  @action
  addRating(rating, session_id) {
    const session =  this.store.peekRecord('session', session_id, { backgroundReload: false });
    this.set('isLoading', true);
    const feedback = this.store.createRecord('feedback', {
      rating,
      session,
      comment : '',
      user    : this.authManager.currentUser
    });
    feedback.save()
      .then(() => {
        this.notify.success(this.l10n.t('Session feedback has been created successfully.'),
          {
            id: 'session_feed_created'
          });
        this.refreshModel.bind(this)();
      })
      .catch(() => {
        this.notify.error(this.l10n.t('An unexpected error has occurred.'),
          {
            id: 'session_feed_error_created'
          });
      })
      .finally(() => {
        this.set('isLoading', false);
      });
  }
}
