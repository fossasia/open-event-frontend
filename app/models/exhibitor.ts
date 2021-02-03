import ModelBase from 'open-event-frontend/models/base';
import { attr, belongsTo } from '@ember-data/model';

export default class Exhibitor extends ModelBase.extend() {
  @attr() name!: string;
  @attr() description!: string;
  @attr() url!: string;
  @attr() logoUrl!: string;
  @attr() bannerUrl!: string;
  @attr() videoUrl!: string;
  @attr() slidesUrl!: string;

  @belongsTo('event') event!: Event;
}

// DO NOT DELETE: this is how TypeScript knows how to look up your models.
declare module 'ember-data/types/registries/model' {
  export default interface ModelRegistry {
    'exhibitor': Exhibitor;
  }
}
