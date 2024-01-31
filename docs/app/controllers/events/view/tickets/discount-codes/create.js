import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import Controller from '@ember/controller';

@classic
export default class CreateController extends Controller {
  @action
  saveCode(discountCode) {
    discountCode.save()
      .then(() => {
        this.notify.success(this.l10n.t('Discount code has been successfully created.'));
        this.transitionToRoute('events.view.tickets.discount-codes');
      })
      .catch(e => {
        console.error('Error while creating discount code', e);
        this.notify.error(this.l10n.t('An unexpected error has occurred. Discount code cannot be created.'));
      });
  }
}
