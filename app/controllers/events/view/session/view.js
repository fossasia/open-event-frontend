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
  async WithdrawnSession() {
    const oldState = this.model.session.state;
    this.model.session.set('state', 'withdrawn');
    this.set('isLoading', true);

    try {
      await this.model.session.save();
      this.notify.success(this.l10n.t('Session has been withdrawn successfully.'), {
        id: 'session_state'
      });
      this.refreshModel.bind(this)();
    } catch (e) {
      this.model.session.set('state', oldState);
      // this.errorHandler.handle(e);
    } finally {
      this.set('isLoading', false);
    }
  }
}
