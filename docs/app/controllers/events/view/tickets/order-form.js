import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import Controller from '@ember/controller';

@classic
export default class OrderFormController extends Controller {
  /**
   * Save the event and the forms.
   */
  async saveForms(data) {
    await data.event.save();
    await Promise.all((data.customForms ? data.customForms.toArray() : []).map(customForm => customForm.save()));
    return data;
  }

  @action
  save(data) {
    this.set('isLoading', true);
    this.saveForms(data)
      .then(() => {
        this.notify.success(this.l10n.t('Your Attendee form has been saved'));
      })
      .catch(e => {
        console.error('Error while savind attendee form', e);
        this.notify.error(e.errors[0].detail);
      })
      .finally(() => {
        this.set('isLoading', false);
      });
  }
}
