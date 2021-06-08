import { attr, belongsTo } from '@ember-data/model';
import ModelBase from 'open-event-frontend/models/base';
import VideoStream from './video-stream';
import moment from 'moment';


export default class VideoRecording extends ModelBase.extend() {
  @attr() bbbRecordId!: string;
  @attr() participants!: number;
  @attr() url!: string;
  @attr() startTime!: moment.Moment;
  @attr() endTime!: moment.Moment;

  @belongsTo('video-stream') videoStream!: VideoStream
}

// DO NOT DELETE: this is how TypeScript knows how to look up your models.
declare module 'ember-data/types/registries/model' {
  export default interface ModelRegistry {
    'video-recording': VideoRecording
  }
}
