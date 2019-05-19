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
    openProposalDeleteModal() {
      this.set('isProposalDeleteModalOpen', true);
    },
    deleteProposal() {
      this.set('isLoading', true);
      this.model.destroyRecord()
        .then(() => {
          this.transitionToRoute('my-sessions.index');
          this.notify.success(this.l10n.t('Proposal has been deleted successfully.'));
        })
        .catch(() => {
          this.notify.error(this.l10n.t('An unexpected error has occurred.'));
        })
        .finally(() => {
          this.set('isLoading', false);
          this.set('isProposalDeleteModalOpen', false);
        });
    }
  }
});
