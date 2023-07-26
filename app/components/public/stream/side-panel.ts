import Component from '@glimmer/component';
import VideoStream from 'open-event-frontend/models/video-stream';
import { tracked } from '@glimmer/tracking';
import { action, computed } from '@ember/object';
import Event from 'open-event-frontend/models/event';
import { inject as service } from '@ember/service';
import { slugify, stringHashCode } from 'open-event-frontend/utils/text';
import { hasSessions, hasExhibitors } from 'open-event-frontend/utils/event';
import Loader from 'open-event-frontend/services/loader';
import EventService from 'open-event-frontend/services/event';

interface Args {
  videoStream: VideoStream,
  event: Event,
  shown: boolean,
  showChatPanel: any,
  currentRoom: any,
}

export default class PublicStreamSidePanel extends Component<Args> {
  @service loader!: Loader;
  @service declare event: EventService;
  @service declare settings: any;
  @service authManager: any;
  @service confirm: any;

  @tracked shown = false;
  @tracked token = '';
  @tracked success = null;
  @tracked loading = true;
  @tracked streams: VideoStream[] = [];
  @tracked showSessions: number | null = null;
  @tracked showSpeakers: number | null = null;
  @tracked showExhibitors: number | null = null;
  @tracked showChat = false;
  @tracked showRoomChat = false;
  @tracked showVideoRoom = false;

  colors = ['bisque', 'aqua', 'aquamarine', 'cadetblue', 'chartreuse',
    'coral', 'chocolate', 'crimson', 'cyan', 'darkcyan',
    'blueviolet', 'burlywood', 'cornflowerblue', 'darkblue',
    'darkgoldenrod', 'darkgreen', 'darkmagenta', 'darkorchid',
    'darkorange', 'darkred', 'darksalmon', 'darkseagreen',
    'darkslateblue', 'darkslategray', 'darkviolet',
    'darkturquoise', 'deeppink', 'deepskyblue', 'dimgray',
    'dodgerblue', 'forestgreen', 'fuchsia', 'gold', 'goldenrod',
    'green', 'hotpink', 'indianred', 'indigo', 'lawngreen',
    'lightcoral', 'lightsalmon', 'lightseagreen', 'limegreen',
    'maroon', 'mediumorchid', 'mediumpurple', 'mediumspringgreen'];

  async checkSpeakers(): Promise<void> {
    this.showSpeakers = this.showSpeakers ?? await this.event.hasSpeakers(this.args.event.id);
  }

  async checkSessions(): Promise<void> {
    this.showSessions = this.showSessions ?? await hasSessions(this.loader, this.args.event);
  }

  async checkExhibitors(): Promise<void> {
    this.showExhibitors = this.showExhibitors ?? await hasExhibitors(this.loader, this.args.event);
  }

  @computed('args.currentRoom')
  get isChatShowing(): boolean {
    if (this.args.currentRoom) {
      return this.args.event.isChatEnabled && this.settings.rocketChatUrl && (this.args.currentRoom.isChatEnabled || this.args.currentRoom.isGlobalEventRoom);
    }
    return false
  }

  addStream(stream: VideoStream | null): void {
    if (!stream) {return;}
    if (this.streams.map(stream => stream.id).any(id => id === stream.id)) {return;}
    this.streams.push(stream);
  }

  @action
  async setup(): Promise<void> {
    this.shown = this.args.shown || Boolean(new URLSearchParams(location.search).get('side_panel'));
    this.addStream(this.args.event.belongsTo('videoStream').value());

    this.checkSessions();
    this.checkSpeakers();
    this.checkExhibitors();
    this.showChat = this.args.event.isChatEnabled && this.settings.rocketChatUrl;
    this.showVideoRoom = this.args.event.isVideoroomEnabled;

    if (this.args.event.isSchedulePublished) {
      try {
        const rooms = await this.loader.load(`/events/${this.args.event.identifier}/microlocations?include=video-stream&fields[microlocation]=id,name,video_stream,position,is_chat_enabled,chat_room_name,is_global_event_room&fields[video-stream]=id,name&sort=position`);
        rooms.included?.map((stream: any) => ({
          id                : stream.id,
          name              : stream.attributes.name,
          roomName          : rooms.data.filter((room: any) => room.relationships['video-stream'].data.id === stream.id).map((room: any) => room.attributes.name)[0],
          slugName          : slugify(stream.attributes.name),
          isChatEnabled     : rooms.data.filter((room: any) => room.relationships['video-stream'].data.id === stream.id).map((room: any) => room.attributes['is-chat-enabled'])[0],
          isGlobalEventRoom : rooms.data.filter((room: any) => room.relationships['video-stream'].data.id === stream.id).map((room: any) => room.attributes['is-global-event-room'])[0],
          chatRoomName      : rooms.data.filter((room: any) => room.relationships['video-stream'].data.id === stream.id).map((room: any) => room.attributes['chat-room-name'])[0],
          microlocationId   : rooms.data.filter((room: any) => room.relationships['video-stream'].data.id === stream.id).map((room: any) => room.id)[0],
          hash              : stringHashCode(stream.attributes.name + stream.id)
        })).forEach((stream: any) => {
          this.addStream(stream)
        });
      } catch (e) {
        console.error('Error while loading rooms in video stream', e);
      }

      if (this.args.event.isChatEnabled) {
        const { success, token } = await this.loader.load(`/events/${this.args.event.id}/chat-token`);
        this.token = token;
        this.success = success;
      }

      this.loading = false;
    }

    this.loading = false;
    this.streams = [...this.streams];
  }
}
