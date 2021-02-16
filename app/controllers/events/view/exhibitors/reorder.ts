import Controller from '@ember/controller';
import { action } from '@ember/object';
import { getOwner } from '@ember/application';
import { inject as service } from '@ember/service';
import Exhibitor from 'open-event-frontend/models/exhibitor';
import Loader from 'open-event-frontend/services/loader';

export default class ExhibitorsReorderController extends Controller {
  @service declare loader: Loader;
  @service notify: any;
  @service l10n: any;
  @service router: any;

  useSwap = false;

  @action sortEndAction(): void {
    this.model.exhibitors.forEach((exhibitor: Exhibitor, index: number) => {
      exhibitor.position = index;
    });
  }

  @action async reset(): Promise<void> {
    const res = await this.loader.post(`/events/${this.model.event.id}/reorder-exhibitors?reset`);
    if (res.success) {
      this.notify.success(this.l10n.t('Exhibitor order reset successfully'));
      getOwner(this).lookup(`route:${this.router.currentRoute.name}`).refresh();
    } else {
      console.error('Error while resetting exhibitor order', res);
      this.notify.error(this.l10n.t('Oops something went wrong. Please try again'));
    }
  }

  @action async save(): Promise<void> {
    const data = this.model.exhibitors.map((exhibitor: Exhibitor) => ({ exhibitor: exhibitor.id, position: exhibitor.position }));
    const res = await this.loader.post(`/events/${this.model.event.id}/reorder-exhibitors`, data);
    if (res.success) {
      this.notify.success(this.l10n.t('Exhibitors order set successfully'));
    } else {
      console.error('Error while setting exhibitors order', res);
      this.notify.error(this.l10n.t('Oops something went wrong. Please try again'));
    }
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your controllers.
declare module '@ember/controller' {
  interface Registry {
    'events/view/exhibitors/reorder': ExhibitorsReorderController;
  }
}
