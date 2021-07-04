import { belongsTo } from '@ember-data/model';
import ModelBase from 'open-event-frontend/models/base';
import Group from './group';
import User from './user';

export default class UserFollowGroup extends ModelBase.extend() {
  @belongsTo('group') group!: Group;
  @belongsTo('user') user!: User;
}

// DO NOT DELETE: this is how TypeScript knows how to look up your models.
declare module 'ember-data/types/registries/model' {
  export default interface ModelRegistry {
    'user-follow-group': UserFollowGroup;
  }
}
