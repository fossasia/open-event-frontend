import Service, { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { SPEAKERS_FILTER } from 'open-event-frontend/routes/public/speakers';
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

  @tracked speakersMetaPromiseMap = new Map<string, Promise<any>>();

  getSpeakersMeta(eventId: string): Promise<any> {
    const promise = this.speakersMetaPromiseMap.get(eventId);
    if (promise) {
      return promise
    }

    const speakersMetaPromise = this.loader.load(`/events/${eventId}/speakers?cache=true&public=true&fields[speaker]=id&page[size]=1&filter=${JSON.stringify(SPEAKERS_FILTER)}`);
    this.speakersMetaPromiseMap.set(eventId, speakersMetaPromise);

    return speakersMetaPromise;
  }

  async hasSpeakers(eventId: string): Promise<number> {
    return (await this.getSpeakersMeta(eventId)).data.length;
  }

}

// DO NOT DELETE: this is how TypeScript knows how to look up your services.
declare module '@ember/service' {
  interface Registry {
    'event': EventService;
  }
}
