import Component from '@glimmer/component';
import VideoStream from 'open-event-frontend/models/video-stream';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import Event from 'open-event-frontend/models/event';
import { inject as service } from '@ember/service';
import { slugify } from 'open-event-frontend/utils/text';
import { hasSessions, hasSpeakers } from 'open-event-frontend/utils/event';
import Loader from 'open-event-frontend/services/loader';

interface Args {
  videoStream: VideoStream,
  event: Event,
  shown: boolean
}

export default class PublicStreamSidePanel extends Component<Args> {
  @service loader!: Loader;

  @tracked shown = false;
  @tracked loading = true;
  @tracked streams: VideoStream[] = [];
  @tracked showSessions: number | null = null;
  @tracked showSpeakers: number | null = null;

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
    this.showSpeakers = this.showSpeakers ?? await hasSpeakers(this.loader, this.args.event);
  }

  async checkSessions(): Promise<void> {
    this.showSessions = this.showSessions ?? await hasSessions(this.loader, this.args.event);
  }

  addStream(stream: VideoStream | null): void {
    if (!stream) {return;}
    if (this.streams.map(stream => stream.id).any(id => id === stream.id)) {return;}
    this.streams.push(stream);
  }

  @action
  async setup(): Promise<void> {
    this.shown = this.args.shown || Boolean(new URLSearchParams(location.search).get('side_panel'));
    this.addStream(this.args.videoStream);
    this.addStream(this.args.event.belongsTo('videoStream').value());

    this.checkSessions();
    this.checkSpeakers();

    try {
      const rooms = await this.loader.load(`/events/${this.args.event.identifier}/microlocations?include=video-stream&fields[microlocation]=id,video_stream&fields[video-stream]=id,name&sort=video-stream.name`);
      rooms.included?.map((stream: any) => ({ id: stream.id, name: stream.attributes.name, slugName: slugify(stream.attributes.name) })).forEach((stream: any) => {
        this.addStream(stream)
      });
    } catch (e) {
      console.error('Error while loading rooms in video stream', e);
    } finally {
      this.loading = false;
      this.streams = [...this.streams];
    }
  }

  @action
  reOrderStreams(): void {
    const streams = [...this.streams];
    this.streams = [];
    this.addStream(this.args.videoStream);
    for (const stream of streams) {
      this.addStream(stream);
    }
  }
}
