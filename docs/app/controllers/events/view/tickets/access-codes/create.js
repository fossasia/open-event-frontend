import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import Controller from '@ember/controller';

@classic
export default class CreateController extends Controller {
  @action
  save(accessCode) {
    accessCode.save()
      .then(() => {
        this.notify.success(this.l10n.t('Access code has been successfully created.'));
        this.transitionToRoute('events.view.tickets.access-codes');
      })
      .catch(e => {
        console.error('Error while creating access code', e);
        this.notify.error(this.l10n.t('An unexpected error has occurred. Access code cannot be created.'));
      });
  }
}
