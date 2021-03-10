import Controller from '@ember/controller';
import { computed, action } from '@ember/object';
import { extractYoutubeUrl } from 'open-event-frontend/utils/url';
import { buttonColor } from 'open-event-frontend/utils/dictionary/social-media';
import { inject as service } from '@ember/service';
import { isEmpty } from '@ember/utils';


export default class extends Controller {
  @service event;
  preserveScrollPosition = true;

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
    return this.session.isAuthenticated && (this.model.exhibitor.contactEmail || this.model.exhibitor.contactLink);
  }

  @action
  changeExhibitor(flag) {
    let nextPos = this.model.exhibitor.position + flag;
    if (nextPos < 0) {
      nextPos = this.model.exhibitors.toArray().length - 1;
    }
    if (nextPos === (this.model.exhibitors.toArray().length)) {
      nextPos = 0;
    }
    const nextExhibitor = this.model.exhibitors.toArray().filter(exh => exh.position === nextPos);
    if (isEmpty(nextExhibitor)) {
      const currentExhibitor = this.model.exhibitors.toArray().filter(exh => exh.id === this.model.exhibitor.id);
      let nextIndex = this.model.exhibitors.toArray().indexOf(currentExhibitor[0]) + flag;
      if (nextIndex < 0) {
        nextIndex = this.model.exhibitors.toArray().length - 1;
      }
      if (nextIndex === (this.model.exhibitors.toArray().length)) {
        nextIndex = 0;
      }
      this.router.transitionTo('public.exhibition.view', this.model.exhibitors.toArray()[nextIndex].id);
    } else {
      this.router.transitionTo('public.exhibition.view', nextExhibitor[0].id);
    }
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
