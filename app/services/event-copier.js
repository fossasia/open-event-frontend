import Service from '@ember/service';
import { inject as service } from '@ember/service';

export default class EventCopierService extends Service {
  @service loader;
  @service notify;
  @service l10n;

  async copy(eventId) {
    return this.loader.post(`events/${eventId}/copy`, {});
  }

  success() {
    this.notify.success(this.l10n.t('Event copied successfully'), { id: 'event_copy_succ' });
  }

  error() {
    this.notify.error(this.l10n.t('Copying of event failed'), { id: 'event_copy_fail' });
  }
}
