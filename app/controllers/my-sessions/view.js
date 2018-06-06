import Controller from '@ember/controller';
import { computed } from '@ember/object';
import moment from 'moment';

export default Controller.extend({
  isUpcoming: computed('model.endsAt', function() {
    let endAt = this.get('model.endsAt');
    if (endAt < moment()) {
      return false;
    }
    return true;
  }),

  actions: {
    editSession(event_id, session_id) {
      this.transitionToRoute('events.view.sessions.edit', event_id, session_id);
    },
    editSpeaker(event_id, speaker_id) {
      this.transitionToRoute('events.view.speakers.edit', event_id, speaker_id);
    },
    openProposalDeleteModal() {
      this.set('isProposalDeleteModalOpen', true);
    },
    deleteProposal() {
      this.set('isLoading', true);
      this.get('model').destroyRecord()
        .then(() => {
          this.transitionToRoute('my-sessions.index');
          this.notify.success(this.get('l10n').t('Proposal has been deleted successfully.'));
        })
        .catch(() => {
          this.notify.error(this.get('l10n').t('An unexpected error has occurred.'));
        })
        .finally(() => {
          this.set('isLoading', false);
          this.set('isProposalDeleteModalOpen', false);
        });
    }
  }
});
