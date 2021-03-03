import Service, { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import AuthManagerService from './auth-manager';
import Loader from './loader';

export default class EventService extends Service {
  @service declare loader: Loader;
  @service declare authManager: AuthManagerService;

  @tracked eventStreamMap = new Map<string, any>();

  async hasStreams(eventId: number): Promise<{exists: boolean; can_access: boolean;}> {
    const key = eventId + '_' + this.authManager.currentUser?.id;
    if (this.eventStreamMap.has(key)) {
      return this.eventStreamMap.get(key);
    }

    const streamStatus = await this.loader.load(`/events/${eventId}/has-streams`);
    this.eventStreamMap.set(key, streamStatus);

    return streamStatus;
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your services.
declare module '@ember/service' {
  interface Registry {
    'event': EventService;
  }
}
