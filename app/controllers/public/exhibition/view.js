import Controller from '@ember/controller';
import { computed, action } from '@ember/object';
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

  @computed('model.socialLinks')
  get links() {
    return this.model.socialLinks.map(socialLink => {
      const newLink = {};
      newLink.name = socialLink.name;
      newLink.link = socialLink.link;
      newLink.is_custom = socialLink.is_custom;
      newLink.color = buttonColor[socialLink.name];
      return newLink;
    });
  }

  @computed('model')
  get contactExhibitor() {
    return this.session.isAuthenticated;
  }

  @action
  openVideo() {
    if (this.session.isAuthenticated) {
      this.router.transitionTo('public.exhibition.video', this.model.id, { queryParams: { side_panel: true } });
    } else {
      this.router.transitionTo('public.exhibition.view', this.model.id, { queryParams: { video_dialog: true } });
    }
  }
}
