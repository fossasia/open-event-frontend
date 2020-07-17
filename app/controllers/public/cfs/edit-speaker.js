import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import Controller from '@ember/controller';

@classic
export default class EditSpeakerController extends Controller {
  @action
  save() {
    this.set('isLoading', true);
    this.model.speaker.save()
      .then(() => {
        this.notify.success(this.l10n.t('Speaker details have been saved'),
          {
            id: 'speaker_det_save'
          });
        this.transitionToRoute('public.cfs.index');
      })
      .catch(() => {
        this.notify.error(this.l10n.t('Oops something went wrong. Please try again'),
          {
            id: 'some_error'
          });
      })
      .finally(() => {
        this.set('isLoading', false);
      });
  }
}
