import { attr, hasMany, belongsTo } from '@ember-data/model';
import ModelBase from 'open-event-frontend/models/base';
import { slugify, stringHashCode } from 'open-event-frontend/utils/text';
import Event from './event';
import Microlocation from './microlocation';
import VideoChannel from './video-channel';
import VideoStreamModerator from './video-stream-moderator';
import VideoRecording from './video-recording';

export interface Options {
  record: boolean;
  autoStartRecording: boolean;
  muteOnStart: boolean;
  endCurrentMeeting: boolean;
}
export interface JitsiOptions {
  muteOnStart: boolean;
  hideCamOnStart: boolean;
}
export interface Extra {
  autoplay: boolean;
  loop: boolean;
  bbb_options: Options;
  jitsi_options?: JitsiOptions;
}


export default class VideoStream extends ModelBase.extend() {
  @attr() name!: string;
  @attr() url!: string;
  @attr() password!: string;
  @attr() bgImgUrl?: string;
  @attr() isChatEnabled?: boolean;
  @attr() isGlobalEventRoom?: boolean;
  @attr() additionalInformation!: string;
  @attr() extra!: Extra;
  @attr() chatRoomName?: string;
  @attr() translations?: any[];

  @hasMany('microlocation') rooms!: Microlocation[];
  @hasMany('video-recording') videoRecordings!: VideoRecording[];
  @belongsTo('event') event!: Event;
  @belongsTo('video-channel') videoChannel!: VideoChannel;
  @hasMany('video-stream-moderator') moderators!: VideoStreamModerator;

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
