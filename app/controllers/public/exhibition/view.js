import Controller from '@ember/controller';
import { computed, action } from '@ember/object';
import { extractYoutubeUrl } from 'open-event-frontend/utils/url';
import { buttonColor } from 'open-event-frontend/utils/dictionary/social-media';
import { inject as service } from '@ember/service';

export default class extends Controller {
  @service event;

  @computed('model.exhibitor.videoUrl')
  get youtubeLink() {
    return extractYoutubeUrl(this.model.exhibitor.videoUrl);
  }

  @computed('model.exhibitor.sessions')
  get exhibitorSessions() {
    return this.model.exhibitor.sessions.sortBy('startsAt');
  }

  @computed('model.exhibitor.slidesUrl')
  get pdfLink() {
    return this.model.exhibitor.slidesUrl?.indexOf('.pdf') > -1;
  }

  @computed('model.exhibitor.slidesUrl')
  get pptLink() {
    const { slidesUrl } = this.model.exhibitor;
    return slidesUrl?.indexOf('.pptx') > -1 || slidesUrl?.indexOf('.ppt') > -1;
  }

  @computed('model.exhibitor.socialLinks')
  get links() {
    return this.model.exhibitor.socialLinks?.map(socialLink => {
      const newLink = {};
      newLink.name = socialLink.name;
      newLink.link = socialLink.link;
      newLink.is_custom = socialLink.is_custom;
      newLink.color = buttonColor[socialLink.name];
      return newLink;
    });
  }

  @computed('model.exhibitor')
  get contactExhibitor() {
    return this.session.isAuthenticated;
  }

  @action
  async openVideo() {
    const { can_access } = await this.event.hasStreams(this.model.event.id);
    if (can_access) {
      this.router.transitionTo('public.exhibition.video', this.model.exhibitor.id, { queryParams: { side_panel: true } });
    } else {
      this.router.transitionTo('public.exhibition.view', this.model.exhibitor.id, { queryParams: { video_dialog: true } });
    }
  }
}
