import { action } from '@ember/object';
import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { extractYoutubeUrl } from 'open-event-frontend/utils/url';

export default class SessionItem extends Component {
  @service router;

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

  @action
  goToStream() {
    const url = this.router.urlFor('public.stream.view', this.args.event?.identifier ?? this.args.session.get('event.identifier'), this.args.session.get('microlocation.videoStream.slugName'), this.args.session.get('microlocation.videoStream.id'));
    window.open(url, '_blank');
  }
}
