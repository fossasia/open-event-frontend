import Component from '@glimmer/component';
import { action } from "@ember/object";
import VideoStream from 'open-event-frontend/models/video-stream';
import { getScript } from 'open-event-frontend/utils/loader';


interface Args {
  videoStream: VideoStream
}

export default class PublicStreamVideoStream extends Component<Args> {

  @action
  async setup() {
    await getScript('https://meet.jit.si/external_api.js');
    const domain = 'meet.jit.si';
    const options = {
        roomName: this.args.videoStream.name,
        parentNode: document.querySelector('.ember-application')
    };
    const api = new window.JitsiMeetExternalAPI(domain, options);
  }
}
