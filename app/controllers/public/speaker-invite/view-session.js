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
  async accept() {
    try {
      const header = this.l10n.t('Do you want to accept the invite?');
      await this.confirm.prompt(header + '?');
    } catch {
      return;
    }
    this.set('isLoading', true);
    this.loader.load(`/speaker-invites/${this.model.speakerInvite.id}/accept-invite`)
      .then(() => {
        this.notify.success(this.l10n.t('Speaker invite has been accepted.'),
          {
            id: 'speaker_det_save'
          });
        this.transitionToRoute('public.cfs.view-session', this.model.event.identifier, this.model.session.id);
      })
      .catch(e => {
        console.error('Error while accepting speaker invite', e);
        this.notify.error(this.l10n.t('Oops something went wrong. Please try again.'));
      })
      .finally(() => {
        this.set('isLoading', false);
      });
  }

  @action
  async reject() {
    try {
      const header = this.l10n.t('Do you want to reject the invite?');
      await this.confirm.prompt(header + '?');
    } catch {
      return;
    }
    this.set('isLoading', true);
    this.loader.load(`/speaker-invites/${this.model.speakerInvite.id}/reject-invite`)
      .then(() => {
        this.notify.success(this.l10n.t('Speaker invite has been rejected.'),
          {
            id: 'speaker_det_save'
          });
        this.transitionToRoute('public.cfs', this.model.event.identifier);
      })
      .catch(e => {
        console.error('Error while rejecting speaker invite', e);
        this.notify.error(this.l10n.t('Oops something went wrong. Please try again'));
      })
      .finally(() => {
        this.set('isLoading', false);
      });
  }
}
