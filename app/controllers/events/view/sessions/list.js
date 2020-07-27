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
        valuePath       : 'state',
        isSortable      : true,
        headerComponent : 'tables/headers/sort',
        cellComponent   : 'ui-table/cell/events/view/sessions/cell-session-state'
      },
      {
        name            : 'Title',
        valuePath       : 'title',
        extraValuePaths : ['id', 'event', 'isLocked'],
        isSortable      : true,
        headerComponent : 'tables/headers/sort',
        cellComponent   : 'ui-table/cell/events/view/sessions/cell-session-title',
        width           : 160,
        actions         : {
          viewSession   : this.viewSession.bind(this),
          editSession   : this.editSession.bind(this),
          deleteSession : this.deleteSession.bind(this)
        }
      },
      {
        name          : 'Speakers',
        valuePath     : 'speakers',
        cellComponent : 'ui-table/cell/cell-speakers'
      },
      {
        name            : 'Rating',
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
        valuePath : 'track.name'
      },
      {
        name      : 'Type',
        valuePath : 'sessionType.name'
      },
      {
        name          : 'Submission Date',
        valuePath     : 'submittedAt',
        cellComponent : 'ui-table/cell/cell-simple-date',
        width         : 60,
        options       : {
          dateFormat: 'MMMM DD, YYYY - HH:mm A'
        }
      },
      {
        name          : 'Last Modified',
        valuePath     : 'lastModifiedAt',
        cellComponent : 'ui-table/cell/cell-simple-date',
        width         : 60,
        options       : {
          dateFormat: 'MMMM DD, YYYY - HH:mm A'
        }
      },
      {
        name          : 'Email Sent',
        valuePath     : 'isMailSent',
        cellComponent : 'ui-table/cell/events/view/sessions/cell-is-mail-sent'
      },
      {
        name            : 'Change State',
        cellComponent   : 'ui-table/cell/events/view/sessions/cell-buttons',
        valuePath       : 'id',
        extraValuePaths : ['status'],
        options         : {
          sessionStateMap: this.model.sessionStateMap
        },
        actions: {
          changeState: this.changeState.bind(this)
        }
      },
      {
        name            : 'Lock Session',
        valuePath       : 'id',
        extraValuePaths : ['isLocked'],
        cellComponent   : 'ui-table/cell/events/view/sessions/cell-lock-session',
        actions         : {
          unlockSession : this.unlockSession.bind(this),
          lockSession   : this.lockSession.bind(this)
        }
      }
    ];
  }

  @action
  async deleteSession(session_id) {
    this.set('isLoading', true);
    let session =  this.store.peekRecord('session', session_id, { backgroundReload: false });
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
  viewSession(id) {
    this.transitionToRoute('my-sessions.view', id);
  }

  @action
  lockSession(session_id) {
    let session =  this.store.peekRecord('session', session_id, { backgroundReload: false });
    session.set('isLocked', true);
    this.set('isLoading', true);
    session.save()
      .then(() => {
        this.notify.success(this.l10n.t('Session has been locked successfully.'),
          {
            id: 'session_locked'
          });
        this.refreshModel.bind(this)();
      })
      .catch(() => {
        this.notify.error(this.l10n.t('An unexpected error has occurred.'),
          {
            id: 'session_lock_error'
          });
      })
      .finally(() => {
        this.set('isLoading', false);
      });
  }

  @action
  unlockSession(session_id) {
    let session =  this.store.peekRecord('session', session_id, { backgroundReload: false });
    session.set('isLocked', false);
    this.set('isLoading', true);
    session.save()
      .then(() => {
        this.notify.success(this.l10n.t('Session has been unlocked successfully.'),
          {
            id: 'session_unlock'
          });
        this.refreshModel.bind(this)();
      })
      .catch(() => {
        this.notify.error(this.l10n.t('An unexpected error has occurred.'),
          {
            id: 'session_unexpected_unlock'
          });
      })
      .finally(() => {
        this.set('isLoading', false);
      });
  }

  @action
  async changeState(session_id, state, sendEmail) {
    const session =  this.store.peekRecord('session', session_id, { backgroundReload: false });
    const oldState = session.state;
    session.setProperties({
      sendEmail,
      state,
      isMailSent: sendEmail
    });
    this.set('isLoading', true);

    try {
      await session.save();
      const message = `Session has been ${state}` + (sendEmail ? ' and speaker has been notified via email.' : '');
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
    let session =  this.store.peekRecord('session', session_id, { backgroundReload: false });
    this.set('isLoading', true);
    let feedback = this.store.createRecord('feedback', {
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
