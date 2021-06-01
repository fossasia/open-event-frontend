import Controller from '@ember/controller';
import { SESSION_FORM_ORDER } from 'open-event-frontend/models/custom-form';
import FormMixin from 'open-event-frontend/mixins/form';
import { groupBy } from 'lodash-es';
import { computed, action } from '@ember/object';
import { sortCustomFormFields } from 'open-event-frontend/utils/sort';


export default class extends Controller.extend(FormMixin) {

  @computed('model.form')
  get allFields() {
    const grouped = groupBy(this.model.form.toArray(), field => field.get('form'));
    const fields = sortCustomFormFields(grouped.session, SESSION_FORM_ORDER);
    return fields;
  }

  @action
  openProposalWithdrawModal() {
    this.set('isProposalWithdrawModalOpen', true);
  }

  @action
  async withdrawProposal() {
    const oldState = this.model.session.state;
    this.set('isLoading', true);
    this.model.session.set('state', 'withdrawn');
    try {
      await this.model.session.save();
      this.transitionToRoute('my-sessions.index');
      this.notify.success(this.l10n.t('Proposal has been withdrawn successfully.'),
        {
          id: 'prop_withdraw'
        });
    } catch (e) {
      this.model.session.set('state', oldState);
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
