import Component from '@glimmer/component';
import { action, computed } from '@ember/object';
import { inject as service } from '@ember/service';
import VideoStream from 'open-event-frontend/models/video-stream';
import Event from 'open-event-frontend/models/event';
import { tracked } from '@glimmer/tracking';

declare global {
  interface Window {
    JitsiMeetExternalAPI: any;
  }
}

interface Args {
  videoStream: VideoStream,
  event: Event
}

export default class PublicStreamVideoStream extends Component<Args> {

  @service
  loader!: any;

  @service authManager: any;

  @tracked
  loading = true;

  @tracked
  iframeUrl = '';

  @tracked
  youtubeId = '';

  @tracked
  iframeTitle = '';

  @tracked
  vimeoId = '';

  @computed()
  get isRocketChatEnabled(): boolean {
    return this.authManager.currentUser?.isRocketChatRegistered && this.args.event.isChatEnabled;
  }

  @action
  async setup(): Promise<void> {
    const stream = this.args.videoStream;
    const provider = stream.get('videoChannel.provider');

    this.loading = true;
    this.iframeUrl = '';

    if (provider === 'jitsi') {
      this.loading = false;
    } else if (provider === '3cx') {
      this.iframeUrl = stream.url;
      this.iframeTitle = '3cx Live Stream'
      this.loading = false;
    } else if (provider === 'youtube') {
      const [, id] = stream.url.split('v=');
      if (id) {
        this.youtubeId = id;
      }
      this.loading = false;
    } else if (provider === 'vimeo') {
      const regExp = /https:\/\/(www\.)?vimeo.com\/(\d+)($|\/)/;
      const match = stream.url.match(regExp);
      if (match) {
        this.vimeoId = match[2];
      }
      this.loading = false;
    } else if (provider === 'bbb') {
      const { url } = await this.loader.load(`/video-streams/${stream.id}/join`);

      const targetHost = new URL(url).host;
      const currentHost = new URL(location.href).host;

      if (targetHost.includes(currentHost) || currentHost.includes(targetHost)) {
        // Same origin and can be loaded in an iframe
        this.loading = false;
        this.iframeUrl = url;
        this.iframeTitle = 'BBB'
      } else {
        location.href = url;
      }
    } else {
      location.href = stream.url;
    }
  }
}
