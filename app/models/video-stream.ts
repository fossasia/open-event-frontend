import Model, { attr, hasMany, belongsTo } from '@ember-data/model';
import { slugify } from 'open-event-frontend/utils/text';
import Event from './event';
import Microlocation from './microlocation';

export default class VideoStream extends Model {
  @attr() name!: string;
  @attr() url!: string;
  @attr() password!: string;
  @attr() additionalInformation!: string;
  @hasMany('microlocation') rooms!: Microlocation[];
  @belongsTo('event') event!: Event;

  get slugName(): string {
    return slugify(this.name);
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your models.
declare module 'ember-data/types/registries/model' {
  export default interface ModelRegistry {
    'video-stream': VideoStream
  }
}
