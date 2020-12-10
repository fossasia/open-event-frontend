import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import VideoStream from 'open-event-frontend/models/video-stream';
import { getScript } from 'open-event-frontend/utils/loader';
import AuthManagerService from 'open-event-frontend/services/auth-manager';
import UrlParser from 'url-parse';

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
  authManager!: AuthManagerService

  app: HTMLElement | null = null

  getRoomName(parsedUrl: UrlParser): string {
    return parsedUrl.pathname.slice(1); // drop leading slash
  }

  @action
  async setup(): Promise<void> {
    const stream = this.args.videoStream;
    const provider = stream.get('videoChannel.provider');

    this.app = (document.querySelector('.ember-application') as HTMLElement);
    this.app.innerHTML = '<div class="ui active centered inline loader"></div>';

    if (provider === 'jitsi') {
      await this.setupJitsi(stream);
    } else {
      location.href = stream.url;
    }
  }

  async setupJitsi(stream: VideoStream): Promise<void> {
    const app = (document.querySelector('.ember-application') as HTMLElement);
    app.innerHTML = '<div class="ui active centered inline loader"></div>';

    const channel = await stream.videoChannel;

    await getScript(channel.url + '/external_api.js');

    const parsedUrl = new UrlParser(stream.url, true);
    const domain = parsedUrl.host;
    const options = {
      roomName   : this.getRoomName(parsedUrl),
      parentNode : document.querySelector('.ember-application'),
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
    (this.app as HTMLElement).innerHTML = '';
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
