import Controller from '@ember/controller';
import { computed, action } from '@ember/object';
import { mapBy } from '@ember/object/computed';
import EmberTableControllerMixin from 'open-event-frontend/mixins/ember-table-controller';

export default class extends Controller.extend(EmberTableControllerMixin) {
  @mapBy('model.feedbacks', 'session.id') ratedSessions;

  @computed()
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
        extraValuePaths : ['event', 'isLocked'],
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
        name      : 'Avg Rating',
        valuePath : 'averageRating'
      },
      {
        name      : 'No. of ratings',
        valuePath : 'feedbacks.length'
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
        name            : 'Actions',
        cellComponent   : 'ui-table/cell/events/view/sessions/cell-buttons',
        valuePath       : 'id',
        extraValuePaths : ['status'],
        actions         : {
          acceptProposal  : this.acceptProposal.bind(this),
          confirmProposal : this.confirmProposal.bind(this),
          rejectProposal  : this.rejectProposal.bind(this)
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
    try {
      let session =  this.store.peekRecord('session', session_id, { backgroundReload: false });
      await session.destroyRecord();
      this.notify.success(this.l10n.t('Session has been deleted successfully.'));
    } catch (e) {
      console.warn(e);
      this.notify.error(this.l10n.t('An unexpected error has occurred.'));
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
  async lockSession(session_id) {
    try {
      let session =  this.store.peekRecord('session', session_id, { backgroundReload: false });
      session.set('isLocked', true);
      this.set('isLoading', true);
      await session.save();
      this.notify.success(this.l10n.t('Session has been locked successfully.'));
    } catch (error) {
      this.notify.error(this.l10n.t(error.message));
    }
    this.send('refreshRoute');
    this.set('isLoading', false);
  }

  @action
  async unlockSession(session_id) {
    try {
      let session =  this.store.peekRecord('session', session_id, { backgroundReload: false });
      session.set('isLocked', false);
      this.set('isLoading', true);
      await session.save();
      this.notify.success(this.l10n.t('Session has been unlocked successfully.'));
    } catch (error) {
      this.notify.error(this.l10n.t(error.message));
    }
    this.send('refreshRoute');
    this.set('isLoading', false);
  }

  @action
  async acceptProposal(session_id, sendEmail) {
    try {
      let session =  this.store.peekRecord('session', session_id, { backgroundReload: false });
      session.setProperties({
        sendEmail,
        'state'      : 'accepted',
        'isMailSent' : sendEmail
      });
      this.set('isLoading', true);
      await session.save();
      sendEmail ? this.notify.success(this.l10n.t('Session has been accepted and speaker has been notified via email.'))
        : this.notify.success(this.l10n.t('Session has been accepted'));
    } catch (error) {
      this.notify.error(this.l10n.t(error.message));
    }
    this.send('refreshRoute');
    this.set('isLoading', false);
  }

  @action
  async confirmProposal(session_id, sendEmail) {
    try {
      let session =  this.store.peekRecord('session', session_id, { backgroundReload: false });
      session.setProperties({
        sendEmail,
        'state'      : 'confirmed',
        'isMailSent' : sendEmail
      });
      this.set('isLoading', true);
      await session.save();
      sendEmail ? this.notify.success(this.l10n.t('Session has been confirmed and speaker has been notified via email.'))
        : this.notify.success(this.l10n.t('Session has been confirmed'));
    } catch (error) {
      this.notify.error(this.l10n.t(error.message));
    }
    this.send('refreshRoute');
    this.set('isLoading', false);
  }

  @action
  async rejectProposal(session_id, sendEmail) {
    try {
      let session =  this.store.peekRecord('session', session_id, { backgroundReload: false });
      session.setProperties({
        sendEmail,
        'state'      : 'rejected',
        'isMailSent' : sendEmail
      });
      this.set('isLoading', true);
      await session.save();
      sendEmail ? this.notify.success(this.l10n.t('Session has been rejected and speaker has been notified via email.'))
        : this.notify.success(this.l10n.t('Session has been rejected'));
    } catch (error) {
      this.notify.error(this.l10n.t(error.message));
    }
    this.send('refreshRoute');
    this.set('isLoading', false);
  }

  @action
  async updateRating(rating, feedback) {
    try {
      this.set('isLoading', true);
      if (rating) {
        feedback.set('rating', rating);
        await feedback.save();
      } else {
        await feedback.destroyRecord();
      }
      this.notify.success(this.l10n.t('Session feedback has been updated successfully.'));
    } catch (error) {
      this.notify.error(this.l10n.t(error.message));
    }
    this.send('refreshRoute');
    this.set('isLoading', false);
  }

  @action
  async addRating(rating, session_id) {
    try {
      let session =  this.store.peekRecord('session', session_id, { backgroundReload: false });
      this.set('isLoading', true);
      let feedback = await this.store.createRecord('feedback', {
        rating,
        session,
        comment : '',
        user    : this.authManager.currentUser
      });
      await feedback.save();
      this.notify.success(this.l10n.t('Session feedback has been created successfully.'));
    } catch (error) {
      this.notify.error(this.l10n.t(error.message));
    }
    this.send('refreshRoute');
    this.set('isLoading', false);
  }
}
