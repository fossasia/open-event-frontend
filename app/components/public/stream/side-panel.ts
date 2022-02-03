import Component from '@glimmer/component';
import VideoStream from 'open-event-frontend/models/video-stream';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import Event from 'open-event-frontend/models/event';
import { inject as service } from '@ember/service';
import { slugify, stringHashCode } from 'open-event-frontend/utils/text';
import { hasSessions, hasExhibitors } from 'open-event-frontend/utils/event';
import Loader from 'open-event-frontend/services/loader';
import EventService from 'open-event-frontend/services/event';

interface Args {
  videoStream: VideoStream,
  event: Event,
  shown: boolean
}

export default class PublicStreamSidePanel extends Component<Args> {
  @service loader!: Loader;
  @service declare event: EventService;
  @service declare settings: any;
  @service authManager: any;
  @service declare l10n: any;
  @service confirm: any;


  @tracked shown = false;
  @tracked chatPanelShown = false;
  @tracked token = '';
  @tracked success = null;
  @tracked loading = true;
  @tracked streams: VideoStream[] = [];
  @tracked showSessions: number | null = null;
  @tracked showSpeakers: number | null = null;
  @tracked showExhibitors: number | null = null;
  @tracked showChat = false;
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
        const rooms = await this.loader.load(`/events/${this.args.event.identifier}/microlocations?include=video-stream&fields[microlocation]=id,video_stream&fields[video-stream]=id,name&sort=video-stream.name`);
        rooms.included?.map((stream: any) => ({
          id       : stream.id,
          name     : stream.attributes.name,
          slugName : slugify(stream.attributes.name),
          hash     : stringHashCode(stream.attributes.name + stream.id)
        })).forEach((stream: any) => {
          this.addStream(stream)
        });
      } catch (e) {
        console.error('Error while loading rooms in video stream', e);
      }
      const { success, token } = await this.loader.load(`/events/${this.args.event.id}/chat-token`);
      this.token = token;
      this.success = success;
      this.loading = false;
    }

    this.loading = false;
    this.streams = [...this.streams];
  }

  @action
  async showChatPanel(): Promise<void> {
    if (this.authManager.currentUser?.isRocketChatRegistered) {
      this.chatPanelShown = true;
      return;
    }
    try {
      const heading = this.l10n.t('Please confirm that you understand and agree to the conditions of using the chat!');

      const content =  this.l10n.t('If you join the event chat, your profile name and image will be visible to other attendees. Other event attendees can also contact you directly.') + '<br/><br/>'
        + this.l10n.t('You may change your chat name and chat profile picture by going to account settings on the chat page on the top left.') + ' '
        + this.l10n.t('You need to minimize the side panel to access it.') + ' '
        + this.l10n.t('The feature integration is still in Alpha stage and currently your profile on the {{appName}} account page and on the chat are not linked and can be independently edited.', { appName: this.settings.appName }) + ' '
        + this.l10n.t('When you change the chat settings you may receive additional email confirmations.') + '<br/><br/>'
        + this.l10n.t('Do you want to use the chat now?');

      const options = {
        denyText     : 'Cancel',
        denyColor    : 'red',
        approveText  : 'OK',
        approveColor : 'green',
        extra        : content
      }
      await this.confirm.prompt(heading, options);
      this.chatPanelShown = true;
    } catch {
      this.chatPanelShown = false;
    }
  }
}
