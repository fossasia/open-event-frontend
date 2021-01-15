import Controller from '@ember/controller';
import { SESSION_FORM_ORDER } from 'open-event-frontend/models/custom-form';
import FormMixin from 'open-event-frontend/mixins/form';
import { groupBy } from 'lodash-es';
import { computed } from '@ember/object';
import { sortCustomFormFields } from 'open-event-frontend/utils/sort';


export default class extends Controller.extend(FormMixin) {

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
}
