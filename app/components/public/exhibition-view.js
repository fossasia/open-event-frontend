import classic from 'ember-classic-decorator';
import Component from '@ember/component';
import { computed, action } from '@ember/object';
import { extractYoutubeUrl } from 'open-event-frontend/utils/url';
import { buttonColor } from 'open-event-frontend/utils/dictionary/social-media';
import { inject as service } from '@ember/service';
import { isEmpty } from '@ember/utils';

let exhibitors = [];

@classic
export default class ExhibitionView extends Component {
  @service event;
  exhibitorsLoaded = false;

  @computed('data.exhibitor.videoUrl')
  get youtubeLink() {
    return extractYoutubeUrl(this.data.exhibitor.videoUrl);
  }

  @computed('data.exhibitor.sessions')
  get exhibitorSessions() {
    return this.data.exhibitor.sessions.sortBy('startsAt');
  }

  @computed('data.exhibitor.slidesUrl')
  get pdfLink() {
    return this.data.exhibitor.slidesUrl?.indexOf('.pdf') > -1;
  }

  @computed('data.exhibitor.slidesUrl')
  get pptLink() {
    const { slidesUrl } = this.data.exhibitor;
    return slidesUrl?.indexOf('.pptx') > -1 || slidesUrl?.indexOf('.ppt') > -1;
  }

  @computed('data.exhibitor.socialLinks')
  get links() {
    return this.data.exhibitor.socialLinks?.map(socialLink => {
      const newLink = {};
      newLink.name = socialLink.name;
      newLink.link = socialLink.link;
      newLink.is_custom = socialLink.is_custom;
      newLink.color = buttonColor[socialLink.name];
      return newLink;
    });
  }

  @computed('data.exhibitor')
  get contactExhibitor() {
    return this.session.isAuthenticated && (this.data.exhibitor.contactEmail || this.data.exhibitor.contactLink);
  }

  @action
  changeExhibitor(flag) {
    let nextPos = this.data.exhibitor.position + flag;
    if (nextPos < 0) {
      nextPos = exhibitors.toArray().length - 1;
    }
    if (nextPos === (exhibitors.toArray().length)) {
      nextPos = 0;
    }
    const nextExhibitor = exhibitors.toArray().filter(exh => exh.position === nextPos);
    if (isEmpty(nextExhibitor)) {
      const currentExhibitor = exhibitors.toArray().filter(exh => exh.id === this.data.exhibitor.id);
      let nextIndex = exhibitors.toArray().indexOf(currentExhibitor[0]) + flag;
      if (nextIndex < 0) {
        nextIndex = exhibitors.toArray().length - 1;
      }
      if (nextIndex === (exhibitors.toArray().length)) {
        nextIndex = 0;
      }
      this.router.transitionTo('public.exhibition.view', exhibitors.toArray()[nextIndex].id);
    } else {
      this.router.transitionTo('public.exhibition.view', nextExhibitor[0].id);
    }
  }

  @action
  async openVideo() {
    const { can_access } = await this.event.hasStreams(this.data.event.id);
    if (can_access) {
      this.router.transitionTo('public.exhibition.video', this.data.exhibitor.id, { queryParams: { side_panel: true } });
    } else {
      this.router.transitionTo('public.exhibition.view', this.data.exhibitor.id, { queryParams: { video_dialog: true } });
    }
  }

  @action
  refreshSlide() {
    if (document.getElementById('googleFrame')) {
      document.getElementById('googleFrame').src += '';
    }
  }

  @action
  async initialise() {
    if (!exhibitors.length) {
      exhibitors =  await this.data.event.query('exhibitors', {
        sort         : 'position',
        'page[size]' : 0,
        cache        : true,
        public       : true
      });
    }
    this.set('exhibitorsLoaded', true);
    this.refreshSlide();
  }
}

