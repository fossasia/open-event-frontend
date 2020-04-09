import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import Controller from '@ember/controller';

@classic
export default class EditController extends Controller {
  @action
  save(accessCode) {
    accessCode.save()
      .then(() => {
        this.notify.success(this.l10n.t('Access code has been successfully updated.'));
        this.transitionToRoute('events.view.tickets.access-codes');
      })
      .catch(e => {
        console.error('Error while updating access code', e);
        this.notify.error(this.l10n.t('An unexpected error has occurred. Access code cannot be created.'));
      });
  }
}
