import Controller from '@ember/controller';
import { action, computed } from '@ember/object';

export default class extends Controller {

  @computed('authManager.currentUser.email', 'authManager.currentUser.isAdmin', 'model.speakers')
  get showEditSection() {
    return this.authManager.currentUser.isAdmin || this.model.speakers.map(speaker => speaker.email).includes(this.authManager.currentUser.email);
  }

  @action
  openProposalWithdrawModal() {
    this.set('isProposalWithdrawModalOpen', true);
  }

  @action
  async withdrawProposal() {
    this.set('isLoading', true);
    this.model.set('state', 'withdrawn');
    try {
      await this.model.save();
      this.transitionToRoute('my-sessions.index');
      this.notify.success(this.l10n.t('Proposal has been withdrawn successfully.'),
        {
          id: 'prop_withdraw'
        });
    } catch (e) {
      console.error('Error while withdrawing session', e);
      this.notify.error(this.l10n.t('An unexpected error has occurred.'),
        {
          id: 'view_unex_error'
        });
    } finally {
      this.set('isLoading', false);
      this.set('isProposalWithdrawModalOpen', false);
    }
  }
}
