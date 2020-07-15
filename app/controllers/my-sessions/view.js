import Controller from '@ember/controller';
import { computed, action } from '@ember/object';
import moment from 'moment';

export default class extends Controller {

  @computed('model.endsAt')
  get isUpcoming() {
    let endAt = this.model.endsAt;
    if (endAt < moment()) {
      return false;
    }

    return true;
  }

  @computed('model.complexFieldValues')
  get complexFieldValues() {
    return Object.entries(this.model.complexFieldValues)
      .map(([key, value]) => ({ key, value }));
  }

  @action
  openProposalDeleteModal() {
    this.set('isProposalDeleteModalOpen', true);
  }

  @action
  deleteProposal() {
    this.set('isLoading', true);
    this.model.destroyRecord()
      .then(() => {
        this.transitionToRoute('my-sessions.index');
        this.notify.success(this.l10n.t('Proposal has been deleted successfully.'),
          {
            id: 'prop_del'
          });
      })
      .catch(() => {
        this.notify.error(this.l10n.t('An unexpected error has occurred.'),
          {
            id: 'view_unex_error'
          });
      })
      .finally(() => {
        this.set('isLoading', false);
        this.set('isProposalDeleteModalOpen', false);
      });
  }
}
