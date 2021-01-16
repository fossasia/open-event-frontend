import { attr, hasMany, belongsTo } from '@ember-data/model';
import ModelBase from 'open-event-frontend/models/base';
import { slugify, stringHashCode } from 'open-event-frontend/utils/text';
import Event from './event';
import Microlocation from './microlocation';
import VideoChannel from './video-channel';

export default class VideoStream extends ModelBase.extend() {
  @attr() name!: string;
  @attr() url!: string;
  @attr() password!: string;
  @attr() additionalInformation!: string;
  @hasMany('microlocation') rooms!: Microlocation[];
  @belongsTo('event') event!: Event;
  @belongsTo('video-channel') videoChannel!: VideoChannel;

  get slugName(): string {
    return slugify(this.name);
  }

  get hash(): number {
    return stringHashCode(this.name + this.id)
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your models.
declare module 'ember-data/types/registries/model' {
  export default interface ModelRegistry {
    'video-stream': VideoStream
  }
}
