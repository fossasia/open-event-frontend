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

  slideText: computed('model.slidesUrl', function() {
    let fileUploadRegex = /((https|http):\/\/)?.*\/static\/media\/events\/.*/;
    let slidesUrl = this.get('model.slidesUrl');
    if (fileUploadRegex.test(slidesUrl)) {
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
