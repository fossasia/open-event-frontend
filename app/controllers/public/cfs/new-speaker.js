import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import Controller from '@ember/controller';

@classic
export default class NewSpeakerController extends Controller {
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
        console.error('Error while saving new speaker', e);
        this.notify.error(this.l10n.t('Oops something went wrong. Please try again'));
      })
      .finally(() => {
        this.set('isLoading', false);
      });
  }
}
