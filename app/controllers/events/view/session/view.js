import Controller from '@ember/controller';
import { SESSION_FORM_ORDER } from 'open-event-frontend/models/custom-form';
import FormMixin from 'open-event-frontend/mixins/form';
import { groupBy } from 'lodash-es';
import { computed, action } from '@ember/object';
import { sortCustomFormFields } from 'open-event-frontend/utils/sort';
import { inject as service } from '@ember/service';


export default class extends Controller.extend(FormMixin) {
  @service errorHandler;

  @computed('model.form')
  get allFields() {
    const grouped = groupBy(this.model.form.toArray(), field => field.get('form'));
    const fields = sortCustomFormFields(grouped.session, SESSION_FORM_ORDER);
    return fields;
  }

  @computed('model.session')
  get allSpeakers() {
    return this.model.session.get('speakers').map(speaker => speaker.name).join(', ');
  }

  @action
  async withdrawnSession(session_id) {
    const session =  this.store.peekRecord('session', session_id);
    const oldState = session.state;
    session.set('state', 'withdrawn');
    this.set('isLoading', true);

    try {
      await session.save();
      this.notify.success(this.l10n.t('Session has been withdrawn successfully.'), {
        id: 'session_state'
      });
    } catch (e) {
      session.set('state', oldState);
      this.errorHandler.handle(e);
    } finally {
      this.set('isLoading', false);
    }
  }
}
