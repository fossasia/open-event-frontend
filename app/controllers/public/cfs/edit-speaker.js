import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

@classic
export default class EditSpeakerController extends Controller {
  @service errorHandler;

  @action
  save() {
    this.set('isLoading', true);
    this.model.speaker.save()
      .then(() => {
        this.notify.success(this.l10n.t('Speaker details have been saved'),
          {
            id: 'speaker_det_save'
          });
        this.transitionToRoute('public.cfs.view-speaker', this.model.event.identifier, this.model.speaker.id);
      })
      .catch(e => {
        console.error('Error while editing speaker', e);
        this.errorHandler.handle(e);
      })
      .finally(() => {
        this.set('isLoading', false);
      });
  }
}
