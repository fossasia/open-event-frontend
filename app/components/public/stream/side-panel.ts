import Component from '@glimmer/component';
import VideoStream from 'open-event-frontend/models/video-stream';
import { tracked } from '@glimmer/tracking';
import { action, computed } from '@ember/object';
import Event from 'open-event-frontend/models/event';
import { inject as service } from '@ember/service';
import { slugify, stringHashCode } from 'open-event-frontend/utils/text';
import { hasExhibitors, hasSessions } from 'open-event-frontend/utils/event';
import Loader from 'open-event-frontend/services/loader';
import EventService from 'open-event-frontend/services/event';

interface Args {
  videoStream: VideoStream,
  event: Event,
  shown: boolean,
  showChatPanel: any,
  currentRoom: any,
  streamId: number,
  setupRoomChat: ((stream: any) => void),
}

interface ChannelData {
  id: string,
  attributes: {
    name: string,
    url: string,
  }
}

export default class PublicStreamSidePanel extends Component<Args> {
  @service loader!: Loader;
  @service declare event: EventService;
  @service declare settings: any;
  @service authManager: any;
  @service confirm: any;
  @service selectingLanguage: any;

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
  @tracked languageList: any = [];

  @tracked translationChannels = [{
    id   : '0',
    name : 'Original',
    url  : ''
  }];

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

  async fetchTranslationChannels(streamId: string): Promise<any[] | undefined> {
    if (streamId) {
      const response = await this.loader.load(`/video-streams/${streamId}/translation_channels`);
      if (response.data !== undefined && response.data.length > 0) {
        const newChannels = response.data.map((channel: ChannelData) => ({
          id   : channel.id,
          name : channel.attributes.name,
          url  : channel.attributes.url
        }));
        // Append newChannels to the existing translationChannels list
        const res = [...this.translationChannels, ...newChannels];
        return res;
      }
    }
    return undefined;
  }

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
  switchLanguage(channel: any): void {
    this.selectingLanguage.setLanguage(channel.url);
    this.selectingLanguage.updateTranslationYTId();
    this.selectingLanguage.setName(channel.name);
  }

  @action
  switchRoom(stream: any) {
    if (this.selectingLanguage.getTranslationRoomId() !== stream.id) {
      this.selectingLanguage.setName(null);
    }
    this.selectingLanguage.setTranslationRoomId(stream.id)
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
          position          : stream.attributes.position,
          roomName          : rooms.data.filter((room: any) => room.relationships['video-stream'].data ? room.relationships['video-stream'].data.id === stream.id : null).map((room: any) => room.attributes.name)[0],
          slugName          : slugify(rooms.data.filter((room: any) => room.relationships['video-stream'].data ? room.relationships['video-stream'].data.id === stream.id : null).map((room: any) => room.attributes['chat-room-name'])[0]),
          isChatEnabled     : rooms.data.filter((room: any) => room.relationships['video-stream'].data ? room.relationships['video-stream'].data.id === stream.id : null).map((room: any) => room.attributes['is-chat-enabled'])[0],
          isGlobalEventRoom : rooms.data.filter((room: any) => room.relationships['video-stream'].data ? room.relationships['video-stream'].data.id === stream.id : null).map((room: any) => room.attributes['is-global-event-room'])[0],
          chatRoomName      : rooms.data.filter((room: any) => room.relationships['video-stream'].data ? room.relationships['video-stream'].data.id === stream.id : null).map((room: any) => room.attributes['chat-room-name'])[0],
          microlocationId   : rooms.data.filter((room: any) => room.relationships['video-stream'].data ? room.relationships['video-stream'].data.id === stream.id : null).map((room: any) => room.id)[0],
          hash              : stringHashCode(stream.attributes.name + stream.id),
          translations      : []
        })).forEach((stream: any) => {
          this.addStream(stream)
        });
        const languageLists: any = [];
        Promise.all(this.streams.map(async(stream: any) => {
          const res = await this.fetchTranslationChannels(stream.id);
          const item = {
            streamId: stream.id
          }
          languageLists.push(item);
          stream.translations = res;
        })).then(() => {
          this.languageList = languageLists;
        })
      } catch (e) {
        console.error('Error while loading rooms in video stream', e);
      }
      if (this.args.event.isChatEnabled) {
        const { success, token } = await this.loader.load(`/events/${this.args.event.id}/chat-token`);
        this.token = token;
        this.success = success;
        if (this.args.streamId) {
          const microlocation = this.streams.find(stream => stream.id === this.args.streamId)
          this.args.setupRoomChat(microlocation)
        }
      }

      this.loading = false;
    }

    this.loading = false;
    this.streams = [...this.streams];
  }

  @computed('languageList.@each.streamId')
  get streamList() {
    return this.streams;
  }
}
