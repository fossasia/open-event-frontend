import attr from 'ember-data/attr';
import ModelBase from 'open-event-frontend/models/base';
import { hasMany, belongsTo } from 'ember-data/relationships';

export default class Microlocation extends ModelBase.extend({
  name              : attr('string'),
  floor             : attr('number'),
  latitude          : attr('number'),
  hiddenInScheduler : attr('boolean', { defaultValue: false }),
  longitude         : attr('number'),
  position          : attr('number', { defaultValue: 0 }),
  isChatEnabled     : attr('boolean', { defaultValue: false }),
  isGlobalEventRoom : attr('boolean', { defaultValue: false }),
  // chatRoomId        : attr('string'),
  sessions          : hasMany('session'),
  event             : belongsTo('event'),
  videoStream       : belongsTo('video-stream')
}) {

  get hasVideoStream(): boolean {
    return this.belongsTo('videoStream').value() != null;
  }

}

// DO NOT DELETE: this is how TypeScript knows how to look up your models.
declare module 'ember-data/types/registries/model' {
  export default interface ModelRegistry {
    microlocation: Microlocation
  }
}
