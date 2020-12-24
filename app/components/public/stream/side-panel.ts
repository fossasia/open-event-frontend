import Component from '@glimmer/component';
import VideoStream from 'open-event-frontend/models/video-stream';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import Event from 'open-event-frontend/models/event';
import { inject as service } from '@ember/service';
import { slugify } from 'open-event-frontend/utils/text';

interface Args {
  videoStream: VideoStream,
  event: Event
}

export default class PublicStreamSidePanel extends Component<Args> {
  @service loader: any;

  @tracked shown = false;
  @tracked loading = true;
  @tracked streams: VideoStream[] = [];

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

  addStream(stream: VideoStream | null): void {
    if (!stream) {return;}
    if (this.streams.map(stream => stream.id).any(id => id === stream.id)) {return;}
    this.streams.push(stream);
  }

  @action
  async setup(): Promise<void> {
    this.addStream(this.args.videoStream);
    this.addStream(this.args.event.belongsTo('videoStream').value())

    try {
      const rooms = await this.loader.load(`/events/${this.args.event.identifier}/microlocations?include=video-stream&fields[microlocation]=id,video_stream&fields[video-stream]=id,name`);
      rooms.included?.map((stream: any) => ({ id: stream.id, name: stream.attributes.name, slugName: slugify(stream.attributes.name) })).forEach((stream: any) => {
        this.addStream(stream)
      });
    } catch (e) {
      console.error('Error while loading rooms in video stream', e);
    } finally {
      this.loading = false;
    }

  }
}
