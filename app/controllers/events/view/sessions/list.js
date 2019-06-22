import Controller from '@ember/controller';

export default Controller.extend({
  columns: [
    {
      propertyName   : 'state',
      title          : 'State',
      disableSorting : true,
      template       : 'components/ui-table/cell/events/view/sessions/cell-session-state'
    },
    {
      propertyName   : 'title',
      title          : 'Title',
      disableSorting : true,
      template       : 'components/ui-table/cell/events/view/sessions/cell-session-title'
    },
    {
      propertyName   : 'speakers',
      template       : 'components/ui-table/cell/cell-speakers',
      title          : 'Speakers',
      disableSorting : true
    },
    {
      propertyName   : 'average_rating',
      template       : 'components/ui-table/cell/events/view/sessions/cell-rating',
      title          : 'Rating',
      disableSorting : false
    },
    {
      propertyName : 'track.name',
      title        : 'Track'
    },
    {
      propertyName : 'sessionType.name',
      title        : 'Type'
    },
    {
      propertyName : 'submittedAt',
      template     : 'components/ui-table/cell/cell-simple-date',
      dateFormat   : 'MMMM DD, YYYY - HH:mm A',
      title        : 'Submission Date'
    },
    {
      propertyName : 'lastModifiedAt',
      template     : 'components/ui-table/cell/cell-simple-date',
      dateFormat   : 'MMMM DD, YYYY - HH:mm A',
      title        : 'Last Modified'
    },
    {
      propertyName   : 'is-mail-sent',
      title          : 'Email Sent',
      template       : 'components/ui-table/cell/events/view/sessions/cell-is-mail-sent',
      disableSorting : true
    },
    {
      template         : 'components/ui-table/cell/events/view/sessions/cell-buttons',
      title            : 'Actions',
      disableSorting   : true,
      disableFiltering : true
    },
    {
      template         : 'components/ui-table/cell/events/view/sessions/cell-lock-session',
      title            : 'Lock Session',
      disableSorting   : true,
      disableFiltering : true
    }
  ],
  actions: {
    deleteSession(session) {
      this.set('isLoading', true);
      session.destroyRecord()
        .then(() => {
          this.notify.success(this.l10n.t('Session has been deleted successfully.'));
        })
        .catch(() => {
          this.notify.error(this.l10n.t('An unexpected error has occurred.'));
        })
        .finally(() => {
          this.set('isLoading', false);
        });
    },
    editSession(id) {
      this.transitionToRoute('events.view.sessions.edit', id);
    },
    viewSession(id) {
      this.transitionToRoute('events.view.sessions.edit', id);
    },
    lockSession(session) {
      session.set('isLocked', true);
      this.set('isLoading', true);
      session.save()
        .then(() => {
          this.notify.success(this.l10n.t('Session has been locked successfully.'));
          this.send('refreshRoute');
        })
        .catch(() => {
          this.notify.error(this.l10n.t('An unexpected error has occurred.'));
        })
        .finally(() => {
          this.set('isLoading', false);
        });
    },
    unlockSession(session) {
      session.set('isLocked', false);
      this.set('isLoading', true);
      session.save()
        .then(() => {
          this.notify.success(this.l10n.t('Session has been unlocked successfully.'));
          this.send('refreshRoute');
        })
        .catch(() => {
          this.notify.error(this.l10n.t('An unexpected error has occurred.'));
        })
        .finally(() => {
          this.set('isLoading', false);
        });
    },
    acceptProposal(session, sendEmail) {
      session.set('sendEmail', sendEmail);
      session.set('state', 'accepted');
      session.set('isMailSent', sendEmail);
      this.set('isLoading', true);
      session.save()
        .then(() => {
          sendEmail ? this.notify.success(this.l10n.t('Session has been accepted and speaker has been notified via email.'))
            : this.notify.success(this.l10n.t('Session has been accepted'));
          this.send('refreshRoute');
        })
        .catch(() => {
          this.notify.error(this.l10n.t('An unexpected error has occurred.'));
        })
        .finally(() => {
          this.set('isLoading', false);
        });
    },
    confirmProposal(session, sendEmail) {
      session.set('sendEmail', sendEmail);
      session.set('state', 'confirmed');
      session.set('isMailSent', sendEmail);
      this.set('isLoading', true);
      session.save()
        .then(() => {
          sendEmail ? this.notify.success(this.l10n.t('Session has been confirmed and speaker has been notified via email.'))
            : this.notify.success(this.l10n.t('Session has been confirmed'));
          this.send('refreshRoute');
        })
        .catch(() => {
          this.notify.error(this.l10n.t('An unexpected error has occurred.'));
        })
        .finally(() => {
          this.set('isLoading', false);
        });
    },
    rejectProposal(session, sendEmail) {
      session.set('sendEmail', sendEmail);
      session.set('state', 'rejected');
      session.set('isMailSent', sendEmail);
      this.set('isLoading', true);
      session.save()
        .then(() => {
          sendEmail ? this.notify.success(this.l10n.t('Session has been rejected and speaker has been notified via email.'))
            : this.notify.success(this.l10n.t('Session has been rejected'));
          this.send('refreshRoute');
        })
        .catch(() => {
          this.notify.error(this.l10n.t('An unexpected error has occurred.'));
        })
        .finally(() => {
          this.set('isLoading', false);
        });
    },
    async updateRating(session, rating) {
      try {
        if (session.feedbacks.length) {
          this.set('isLoading', true);
          const user = this.authManager.currentUser;
          let feedback = session.feedbacks.firstObject;
          feedback.setProperties({
            user,
            rating
          });
          await feedback.save();
          this.notify.success(this.l10n.t('Session feedback has been updated successfully.'));
        } else {
          this.set('isLoading', true);
          const user = this.authManager.currentUser;
          const comment = '';
          let feedback = await this.store.createRecord('feedback', {
            rating,
            comment,
            session,
            user
          });
          await feedback.save();
          this.notify.success(this.l10n.t('Session feedback has been created successfully.'));
        }
      } catch (error) {
        this.notify.error(this.l10n.t(error.message));
      }
      this.send('refreshRoute');
      this.set('isLoading', false);
    }
  }
});