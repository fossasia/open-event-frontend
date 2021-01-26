import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import Controller from '@ember/controller';

@classic
export default class EditSessionController extends Controller {
  @action
  save() {
    this.set('isLoading', true);
    this.model.session.save()
      .then(() => {
        this.notify.success(this.l10n.t('Session details have been saved'),
          {
            id: 'session_save'
          });
        this.transitionToRoute('public.cfs.view-session', this.model.event.identifier, this.model.session.id);
      })
      .catch(e => {
        console.error('Error while editing session', e);
        this.notify.error(this.l10n.t('Oops something went wrong. Please try again'),
          {
            id: 'sess_error'
          });
      })
      .finally(() => {
        this.set('isLoading', false);
      });
  }
}
