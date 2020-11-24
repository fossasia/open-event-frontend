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

  getRoomName(url: string): string {
    const parsedUrl = new UrlParser(url, true);
    return parsedUrl.pathname.slice(1); // drop leading slash
  }

  @action
  async setup(): Promise<void> {
    const stream = this.args.videoStream;

    const app = (document.querySelector('.ember-application') as HTMLElement);
    app.innerHTML = '<div class="ui active centered inline loader"></div>';
    await getScript('https://meet.jit.si/external_api.js');
    const domain = 'meet.jit.si';
    const options = {
      roomName   : this.getRoomName(stream.url),
      parentNode : document.querySelector('.ember-application'),
      userInfo   : {
        email       : this.authManager.currentUser.email,
        displayName : this.authManager.currentUser.fullName
      },
      configOverwrite: {
        prejoinPageEnabled: false
      },
      interfaceConfigOverwrite: {
        HIDE_INVITE_MORE_HEADER: true
      }
    };
    app.innerHTML = '';
    const api = new window.JitsiMeetExternalAPI(domain, options);

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
