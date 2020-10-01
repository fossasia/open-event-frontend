import { action } from '@ember/object';
import Component from '@glimmer/component';
import { extractYoutubeUrl } from 'open-event-frontend/utils/url';

export default class SessionItem extends Component {
  hideImage = false;

  get youtubeLink() {
    return extractYoutubeUrl(this.args.session.videoUrl);
  }

  get pdfLink() {
    return this.args.session.slidesUrl?.indexOf('.pdf') > -1;
  }

  get pptLink() {
    const { slidesUrl } = this.args.session;
    return slidesUrl?.indexOf('.pptx') > -1 || slidesUrl?.indexOf('.ppt') > -1;
  }

  @action
  hideSpeakerImage() {
    this.hideImage = !this.hideImage;
    if (!this.args.session.speakers.length) {
      this.hideImage = false;
    }
  }
}
