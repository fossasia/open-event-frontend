import Controller from '@ember/controller';
import { action } from '@ember/object';
import { mapBy } from '@ember/object/computed';
import EmberTableControllerMixin from 'open-event-frontend/mixins/ember-table-controller';
import { inject as service } from '@ember/service';

export default class extends Controller.extend(EmberTableControllerMixin) {
  sort_by = '-submitted-at';

  @service errorHandler;

  @mapBy('model.feedbacks', 'session.id') ratedSessions;

  get columns() {
    return [
      {
        name            : this.l10n.t('State'),
        headerComponent : 'tables/headers/sort',
        cellComponent   : 'ui-table/cell/events/view/sessions/cell-buttons',
        width           : 90,
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
        name            : this.l10n.t('Title'),
        valuePath       : 'title',
        width           : 180,
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
        name          : this.l10n.t('Speakers'),
        width         : 120,
        valuePath     : 'speakers',
        cellComponent : 'ui-table/cell/cell-speakers'
      },
      {
        name            : this.l10n.t('Rating'),
        width           : 60,
        headerComponent : 'tables/headers/sort',
        isSortable      : true,
        valuePath       : 'averageRating',
        extraValuePaths : ['id', 'feedbacks'],
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
        name            : this.l10n.t('Track'),
        width           : 80,
        headerComponent : 'tables/headers/sort',
        isSortable      : true,
        valuePath       : 'track.name'
      },
      {
        name            : this.l10n.t('Type'),
        width           : 70,
        headerComponent : 'tables/headers/sort',
        isSortable      : true,
        valuePath       : 'sessionType.name'
      },
      {
        name            : this.l10n.t('Submission Date'),
        width           : 100,
        valuePath       : 'submittedAt',
        headerComponent : 'tables/headers/sort',
        isSortable      : true,
        cellComponent   : 'ui-table/cell/cell-simple-date'
      },
      {
        name            : this.l10n.t('Last Modified'),
        width           : 100,
        valuePath       : 'lastModifiedAt',
        headerComponent : 'tables/headers/sort',
        isSortable      : true,
        cellComponent   : 'ui-table/cell/cell-simple-date'
      },
      {
        name            : this.l10n.t('Notify'),
        valuePath       : 'id',
        width           : 40,
        extraValuePaths : ['status'],
        cellComponent   : 'ui-table/cell/events/view/sessions/cell-notify'
      },
      {
        name            : this.l10n.t('Lock Session'),
        valuePath       : 'id',
        width           : 70,
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
      .catch(e => {
        this.errorHandler.handle(e);
      })
      .finally(() => {
        this.set('isLoading', false);
      });
  }

  @action
  editSession(id) {
    this.transitionToRoute('events.view.session.edit', id);
  }

  @action
  viewSession(id) {
    this.transitionToRoute('events.view.session.view', id);
  }

  @action
  async lockSession(session_id, lock) {
    const session =  this.store.peekRecord('session', session_id, { backgroundReload: false });
    const { isLocked } = session;
    session.set('isLocked', lock);
    this.set('isLoading', true);
    const lockMessage = lock ? this.l10n.t('locked') : this.l10n.t('unlocked');
    try {
      await session.save();
      this.notify.success(this.l10n.t('Session has been {{action}} successfully.', {
        action: lockMessage
      }),
      {
        id: 'session_lock'
      });
      this.refreshModel.bind(this)();
    } catch (e) {
      session.set('isLocked', isLocked);
      console.error('Error while changing session lock in organizer session list', e);
      this.errorHandler.handle(e);
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
      this.notify.success(this.l10n.t('Session has been {{action}} successfully.', {
        action: state
      }), {
        id: 'session_state'
      });
      this.refreshModel.bind(this)();
    } catch (e) {
      session.set('state', oldState);
      this.errorHandler.handle(e);
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
        .catch(e => {
          this.errorHandler.handle(e);
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
        .catch(e => {
          this.errorHandler.handle(e);
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
      .catch(e => {
        this.errorHandler.handle(e);
      })
      .finally(() => {
        this.set('isLoading', false);
      });
  }
}
