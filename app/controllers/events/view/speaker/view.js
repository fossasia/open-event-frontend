import Controller from '@ember/controller';
import { SPEAKER_FORM_ORDER } from 'open-event-frontend/models/custom-form';
import FormMixin from 'open-event-frontend/mixins/form';
import { groupBy } from 'lodash-es';
import { computed } from '@ember/object';
import { sortCustomFormFields } from 'open-event-frontend/utils/sort';

export default class extends Controller.extend(FormMixin) {

  @computed('model.form')
  get allFields() {
    const grouped = groupBy(this.model.form.toArray(), field => field.get('form'));
    const fields = sortCustomFormFields(grouped.speaker, SPEAKER_FORM_ORDER);
    return fields;
  }

  @computed('model.speaker')
  get allSessions() {
    return this.model.speaker.get('sessions').map(session => session.title).join(', ');
  }
}
