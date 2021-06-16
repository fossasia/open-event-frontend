import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

@classic
export default class CreateSpeakerController extends Controller {
  @service errorHandler;

  queryParams = ['token'];
  token = null;

  @action
  async save() {
    this.set('isLoading', true);
    this.model.speaker.save()
      .then(() => {
        this.model.speakerInvite.speaker = this.model.speaker;
        this.model.speakerInvite.save()
          .then(() => {
            this.notify.success(this.l10n.t('Speaker details have been saved'),
              {
                id: 'speaker_det_save'
              });
            this.transitionToRoute('speaker-invites.view-speaker', { queryParams: { token: this.token } });
          });
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
