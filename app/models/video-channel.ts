import { attr } from '@ember-data/model';
import ModelBase from 'open-event-frontend/models/base';

export default class VideoChannel extends ModelBase.extend() {
  @attr() name!: string;
  @attr() provider!: string;
  @attr() url!: string;
  @attr() apiUrl!: string;
  @attr() apiKey!: string;

  get isInternalStream(): boolean {
    return (
      this.provider === 'jitsi'
      || this.provider === 'bbb'
      || this.provider === 'youtube'
      || this.provider === 'vimeo'
      || this.provider === 'chatmosphere'
      || this.provider === 'libre'
      || this.provider === '3cx'
    );
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your models.
declare module 'ember-data/types/registries/model' {
  export default interface ModelRegistry {
    'video-channel': VideoChannel;
  }
}
