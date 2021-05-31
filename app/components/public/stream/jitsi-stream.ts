import Component from '@glimmer/component';
import VideoStream from 'open-event-frontend/models/video-stream';
import UrlParser from 'url-parse';
import { getScript } from 'open-event-frontend/utils/loader';
import { inject as service } from '@ember/service';
import AuthManagerService from 'open-event-frontend/services/auth-manager';
import { action } from '@ember/object';

interface Args {
  videoStream: VideoStream
}

export default class PublicStreamJitsiStream extends Component<Args> {
  @service
  authManager!: AuthManagerService;

  getRoomName(parsedUrl: UrlParser): string {
    return parsedUrl.pathname.slice(1); // drop leading slash
  }

  @action
  async setupJitsi(): Promise<void> {
    const stream = this.args.videoStream;
    const channel = await stream.videoChannel;

    const defaultToolbarButtons = [
      'microphone', 'camera', 'closedcaptions', 'desktop', 'fullscreen',
      'fodeviceselection', 'hangup', 'profile', 'chat', 'recording',
      'livestreaming', 'etherpad', 'sharedvideo', 'settings', 'raisehand',
      'videoquality', 'filmstrip', 'feedback', 'stats', 'shortcuts',
      'tileview', 'videobackgroundblur', 'download', 'help', 'mute-everyone', 'security'
    ];

    const root = document.getElementById('jitsi-root');

    root!.innerHTML = '';  // eslint-disable-line @typescript-eslint/no-non-null-assertion

    await getScript(channel.url + '/external_api.js');

    const parsedUrl = new UrlParser(stream.url, true);
    const domain = parsedUrl.host;
    const options = {
      roomName   : this.getRoomName(parsedUrl),
      parentNode : root,
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
        HIDE_INVITE_MORE_HEADER : true,
        TOOLBAR_BUTTONS         : defaultToolbarButtons
      }
    };
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
