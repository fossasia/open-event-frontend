import { belongsTo } from '@ember-data/model';
import ModelBase from 'open-event-frontend/models/base';
import Session from './session';
import User from './user';

export default class UserFavouriteSession extends ModelBase.extend() {
  @belongsTo('session') session!: Session;
  @belongsTo('user') user!: User;
}

// DO NOT DELETE: this is how TypeScript knows how to look up your models.
declare module 'ember-data/types/registries/model' {
  export default interface ModelRegistry {
    'user-favourite-session': UserFavouriteSession;
  }
}
