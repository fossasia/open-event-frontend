import Controller from '@ember/controller';
import { action } from '@ember/object';
import { getOwner } from '@ember/application';
import { inject as service } from '@ember/service';
import Speaker from 'open-event-frontend/models/speaker';
import Loader from 'open-event-frontend/services/loader';

export default class SpeakersReorderController extends Controller {
  @service declare loader: Loader;
  @service notify: any;
  @service l10n: any;
  @service router: any;

  useSwap = false;

  @action sortEndAction(): void {
    this.model.speakers.forEach((speaker: Speaker, index: number) => {
      speaker.order = index;
    });
  }

  @action async reset(): Promise<void> {
    const res = await this.loader.post(`/events/${this.model.event.id}/reorder-speakers?reset`);
    if (res.success) {
      this.notify.success(this.l10n.t('Speaker order reset successfully.'));
      getOwner(this).lookup(`route:${this.router.currentRoute.name}`).refresh();
    } else {
      console.error('Error while resetting speaker order', res);
      this.notify.error(this.l10n.t('Oops something went wrong. Please try again.'));
    }
  }

  @action async save(): Promise<void> {
    const data = this.model.speakers.map((speaker: Speaker) => ({ speaker: speaker.id, order: speaker.order }));
    const res = await this.loader.post(`/events/${this.model.event.id}/reorder-speakers`, data);
    if (res.success) {
      this.notify.success(this.l10n.t('Speaker order set successfully.'));
    } else {
      console.error('Error while setting speaker order', res);
      this.notify.error(this.l10n.t('Oops something went wrong. Please try again.'));
    }
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your controllers.
declare module '@ember/controller' {
  interface Registry {
    'events/view/speakers/reorder': SpeakersReorderController;
  }
}
