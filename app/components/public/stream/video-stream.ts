import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import VideoStream from 'open-event-frontend/models/video-stream';
import { getScript } from 'open-event-frontend/utils/loader';
import AuthManagerService from 'open-event-frontend/services/auth-manager';
import UrlParser from 'url-parse';
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
  authManager!: AuthManagerService;

  @service
  loader!: any;

  @tracked
  loading = true;

  getRoomName(parsedUrl: UrlParser): string {
    return parsedUrl.pathname.slice(1); // drop leading slash
  }

  @action
  async setup(): Promise<void> {
    const stream = this.args.videoStream;
    const provider = stream.get('videoChannel.provider');

    if (provider === 'jitsi') {
      await this.setupJitsi(stream);
    } else if (provider === 'bbb') {
      const { url } = await this.loader.load(`/video-streams/${stream.id}/join`);
      location.href = url;
    } else {
      location.href = stream.url;
    }
  }

  async setupJitsi(stream: VideoStream): Promise<void> {

    const channel = await stream.videoChannel;

    await getScript(channel.url + '/external_api.js');

    const parsedUrl = new UrlParser(stream.url, true);
    const domain = parsedUrl.host;
    const options = {
      roomName   : this.getRoomName(parsedUrl),
      parentNode : document.getElementById('video-root'),
      userInfo   : {
        email       : this.authManager.currentUser.email,
        displayName : this.authManager.currentUser.fullName
      },
      configOverwrite: {
        prejoinPageEnabled  : false,
        startWithAudioMuted : true,
        startWithVideoMuted : true
      },
      interfaceConfigOverwrite: {
        HIDE_INVITE_MORE_HEADER: true
      }
    };
    this.loading = false;
    document.getElementById('video-root')!.innerHTML = ''; // eslint-disable-line @typescript-eslint/no-non-null-assertion
    const api = new window.JitsiMeetExternalAPI(domain, options);

    api.executeCommand('subject', stream.name);

    if (stream.password) {
      api.addEventListener('participantRoleChanged', (event: any) => {
        if (event.role === 'moderator') {
          api.executeCommand('password', stream.password);
        }
      });
      // join a protected channel
      api.on('passwordRequired', () => {
        api.executeCommand('password', stream.password);
      });
    }
  }
}
