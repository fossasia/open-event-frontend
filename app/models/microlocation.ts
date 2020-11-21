import attr from 'ember-data/attr';
import ModelBase from 'open-event-frontend/models/base';
import { hasMany, belongsTo } from 'ember-data/relationships';

export default class Microlocation extends ModelBase.extend({
  name      : attr('string'),
  floor     : attr('number'),
  latitude  : attr('number'),
  longitude : attr('number'),

  sessions    : hasMany('session'),
  event       : belongsTo('event'),
  videoStream : belongsTo('video-stream')
}) {}

// DO NOT DELETE: this is how TypeScript knows how to look up your models.
declare module 'ember-data/types/registries/model' {
  export default interface ModelRegistry {
    microlocation: Microlocation
  }
}
