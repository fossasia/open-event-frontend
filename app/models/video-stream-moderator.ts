import { attr, belongsTo } from '@ember-data/model';
import ModelBase from 'open-event-frontend/models/base';
import VideoStream from './video-stream';

export default class VideoStreamModerator extends ModelBase.extend() {
  @attr() email!: string;
  @belongsTo('video-stream') videoStream!: VideoStream;
}

// DO NOT DELETE: this is how TypeScript knows how to look up your models.
declare module 'ember-data/types/registries/model' {
  export default interface ModelRegistry {
    'video-stream-moderator': VideoStreamModerator;
  }
}
