import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import VideoStream from 'open-event-frontend/models/video-stream';
import { tracked } from '@glimmer/tracking';

declare global {
  interface Window {
    JitsiMeetExternalAPI: any;
  }
}

interface Args {
  videoStream: VideoStream
}

export default class PublicStreamVideoStream extends Component<Args> {

  @service
  loader!: any;

  @tracked
  loading = true;

  @tracked
  iframeUrl = '';

  @tracked
  youtubeId = '';

  @tracked
  vimeoId = '';

  @tracked
  autoplay = false;

  @action
  async setup(): Promise<void> {
    const stream = this.args.videoStream;
    const provider = stream.get('videoChannel.provider');

    this.loading = true;
    this.iframeUrl = '';

    if (provider === 'jitsi') {
      this.loading = false;
    } else if (provider === 'youtube') {
      const [, id] = stream.url.split('v=');
      if (id) {
        this.youtubeId = id;
      }
      if (stream.extra?.autoplay) {
        this.autoplay = true;
      }
      this.loading = false;
    } else if (provider === 'vimeo') {
      const regExp = /https:\/\/(www\.)?vimeo.com\/(\d+)($|\/)/;
      const match = stream.url.match(regExp);
      if (match) {
        this.vimeoId = match[2];
      }
      if (stream.extra?.autoplay) {
        this.autoplay = true;
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
      } else {
        location.href = url;
      }
    } else {
      location.href = stream.url;
    }
  }
}
