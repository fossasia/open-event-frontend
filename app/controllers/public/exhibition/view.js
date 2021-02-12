import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { extractYoutubeUrl } from 'open-event-frontend/utils/url';
import { buttonColor } from 'open-event-frontend/utils/dictionary/social-media';

export default class extends Controller {
  @computed('model.videoUrl')
  get youtubeLink() {
    return extractYoutubeUrl(this.model.videoUrl);
  }

  @computed('model.slidesUrl')
  get pdfLink() {
    return this.model.slidesUrl?.indexOf('.pdf') > -1;
  }

  @computed('model.slidesUrl')
  get pptLink() {
    const { slidesUrl } = this.model;
    return slidesUrl?.indexOf('.pptx') > -1 || slidesUrl?.indexOf('.ppt') > -1;
  }

  @computed('model.socailLinks')
  get links() {
    return this.model.socialLinks.map(socialLink => {
      const newLink = {};
      newLink.name = socialLink.name;
      newLink.link = socialLink.link;
      newLink.color = buttonColor[socialLink.name];
      return newLink;
    });
  }
}
