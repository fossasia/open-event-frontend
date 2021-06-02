import Controller from '@ember/controller';
import { action } from '@ember/object';
import EmberTableControllerMixin from 'open-event-frontend/mixins/ember-table-controller';
import { inject as service } from '@ember/service';
import { mapBy } from '@ember/object/computed';

export default class extends Controller.extend(EmberTableControllerMixin) {

  @service errorHandler;

  @mapBy('model.feedbacks', 'session.id') ratedSessions;

  get columns() {
    return [
      {
        name      : this.l10n.t('Event Name'),
        valuePath : 'event.name'
      },
      {
        name            : this.l10n.t('Title'),
        valuePath       : 'title',
        isSortable      : true,
        headerComponent : 'tables/headers/sort'
      },
      {
        name            : this.l10n.t('State'),
        valuePath       : 'state',
        cellComponent   : 'ui-table/cell/events/view/sessions/cell-session-state',
        isSortable      : true,
        headerComponent : 'tables/headers/sort'
      },
      {
        name          : this.l10n.t('Speakers'),
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
        name            : this.l10n.t('Submitted At'),
        valuePath       : 'submittedAt',
        cellComponent   : 'ui-table/cell/cell-simple-date',
        isSortable      : true,
        headerComponent : 'tables/headers/sort'
      },
      {
        name            : this.l10n.t('Starts At'),
        valuePath       : 'startsAt',
        cellComponent   : 'ui-table/cell/cell-simple-date',
        isSortable      : true,
        headerComponent : 'tables/headers/sort'
      },
      {
        name            : this.l10n.t('Ends At'),
        valuePath       : 'endsAt',
        cellComponent   : 'ui-table/cell/cell-simple-date',
        isSortable      : true,
        headerComponent : 'tables/headers/sort'
      },
      {
        name            : this.l10n.t('Actions'),
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
      const session =  this.store.peekRecord('session', session_id, { backgroundReload: false });
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
