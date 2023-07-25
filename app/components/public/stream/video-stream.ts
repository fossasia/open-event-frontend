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
  event: Event,
}

export default class PublicStreamVideoStream extends Component<Args> {

  @service
  loader!: any;

  @service
  l10n: any;

  @service
  confirm: any;

  @service
  settings: any;

  @service authManager: any;

  @tracked
  loading = true;

  @tracked
  iframeUrl = '';

  @tracked
  translationIframeUrl = '';

  @tracked
  youtubeId = '';

  @tracked
  iframeTitle = '';

  @tracked
  vimeoId = '';

  @tracked
  shown = false;

  @tracked
  provider = '';

  @tracked
  player = null;

  @tracked
  player2 = null;

  @tracked
  players = [];

  @tracked
  isPlaying: any;

  @service
  selectingLanguage: any;

  @tracked
  languageUrl = '';

  @computed()
  get isRocketChatEnabled(): boolean {
    return this.authManager.currentUser?.isRocketChatRegistered && this.args.event.isChatEnabled;
  }


  @action
  async setup(): Promise<void> {
    const stream = this.args.videoStream;
    this.loading = true;
    this.iframeUrl = '';
    this.languageUrl = this.selectingLanguage.selectingLanguage;

    if (stream.url.includes('youtube')) {
      this.provider = 'youtube';
      const [, id] = stream.url.split('v=');
      if (id) {
        this.youtubeId = id;
      }
    } else if (stream.url.includes('jit.si')) {
      this.provider = 'jitsi';
      this.iframeUrl = stream.url;
      this.iframeTitle = 'Jitsi Meet Session';
    } else if (stream.url.includes('chatmosphere')) {
      this.provider = 'chatmosphere';
      this.iframeUrl = stream.url;
      this.iframeTitle = 'Chatmosphere Session';
    } else if (stream.url.includes('libre')) {
      // TODO: recheck the condition for libre
      this.provider = 'libre';
      this.iframeUrl = stream.url
      this.iframeTitle = 'Libre Work Adventure Session'
    } else if (stream.url.includes('3cx')) {
      this.provider = '3cx';
      this.iframeUrl = stream.url;
      this.iframeTitle = '3cx Live Stream';
    } else if (stream.url.includes('vimeo')) {
      this.provider = 'vimeo';
      const regExp = /https:\/\/(www\.)?vimeo.com\/(\d+)($|\/)/;
      const match = stream.url.match(regExp);
      if (match) {
        this.vimeoId = match[2];
        this.iframeUrl = `https://player.vimeo.com/video/${this.vimeoId}?autoplay=${stream.extra.autoplay ? 1 : 0}&loop=${stream.extra.loop ? 1 : 0}`;
      }
      this.iframeTitle = 'Vimeo Live Stream';
    } else if (stream.url.includes('bbb')) {
      this.provider = 'bbb';
      const { url } = await this.loader.load(`/video-streams/${stream.id}/join`);

      const targetHost = new URL(url).host;
      const currentHost = new URL(location.href).host;

      if (targetHost.includes(currentHost) || currentHost.includes(targetHost)) {
        // Same origin and can be loaded in an iframe
        this.iframeUrl = url;
        this.iframeTitle = 'BBB'
      } else {
        window.open(url, '_blank');
        return;
      }
    } else {
      window.open(stream.url, '_blank');
      return;
    }
    this.loading = false;
  }

  @action
  async showChatPanel() {
    if (this.shown) {
      this.shown = false;
      return;
    }
    if (this.authManager.currentUser?.isRocketChatRegistered) {
      this.shown = true;
      return;
    }
    try {
      const heading = this.l10n.t('Please confirm that you understand and agree to the conditions of using the chat!');

      const content = this.l10n.t('If you join the event chat, your profile name and image will be visible to other attendees. Other event attendees can also contact you directly.') + '<br/><br/>'
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
      };
      await this.confirm.prompt(heading, options);
      this.shown = true;
    } catch {
      this.shown = false;
    }
  }


  @action
  hideStreamYard() {
    this.selectingLanguage.setStreamYardVisibility(false);
  }

  @action
  setupPlayer() {
    // Create a global function to handle the YouTube API ready event
    window.onYouTubeIframeAPIReady = () => {
      this.player = new window.YT.Player('video-player', {
        playerVars: {
          controls       : 0,  // Hide player controls
          disablekb      : 1, // Disable keyboard controls
          enablejsapi    : 1, // Enable JavaScript API
          iv_load_policy : 3, // Hide annotations
          modestbranding : 1,
          rel            : 0, // Disable related videos
          showinfo       : 0 // Hide video title and uploader info
        },
        events: {
          onStateChange: this.onPlayerStateChange.bind(this)
        }
      });
      this.player2 = new window.YT.Player('video2', {
        events: {
          onStateChange: this.onPlayerStateChange2.bind(this)
        }
      });
    };
    // Load the YouTube Iframe API asynchronously
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  }


  onPlayerStateChange(event) {
    if (event.data === window.YT.PlayerState.PLAYING) {
      this.isPlaying = true;
    } else {
      this.isPlaying = false;
    }
  }

  onPlayerStateChange2(event) {
    if (event.data === window.YT.PlayerState.PLAYING) {
      this.isPlaying = true;
    } else {
      this.isPlaying = false;
    }
  }

}
