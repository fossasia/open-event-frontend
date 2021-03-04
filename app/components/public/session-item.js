import { action } from '@ember/object';
import Component from '@glimmer/component';
import moment from 'moment';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { extractYoutubeUrl } from 'open-event-frontend/utils/url';

export default class SessionItem extends Component {
  @service router;
  @service store;
  @service authManager;
  @service confirm;
  @service l10n;
  @service session;

  @tracked
  hideImage = this.args.expanded;

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

  get slidesUploaded() {
    const url = this.args.session.slidesUrl;
    return url.startsWith('https://open-event-api-dev.herokuapp.com') || url.startsWith('https://api.eventyay.com');
  }

  get sessionEnded() {
    const sessionEndDate =  moment.tz(this.args.session.endsAt, this.args.timezone);
    const now = moment.tz(this.args.timezone);
    return moment(sessionEndDate).isSameOrBefore(now);
  }

  @action
  hideSpeakerImage() {
    this.hideImage = !this.hideImage;
    if (!this.args.session.speakers.length) {
      this.hideImage = false;
    }
  }

  @action
  goToSlides() {
    window.open(this.args.session.slidesUrl, '_blank');
  }

  @action
  goToVideo() {
    window.open(this.args.session.videoUrl, '_blank');
  }

  @action
  goToStream() {
    const url = this.router.urlFor('public.stream.view', this.args.event?.identifier ?? this.args.session.get('event.identifier'), this.args.session.get('microlocation.videoStream.slugName'), this.args.session.get('microlocation.videoStream.id'));
    const isInternal = this.args.session.get('microlocation.videoStream.videoChannel.isInternalStream');
    if (isInternal || this.args.sameTab) {
      location.href = url;
    } else {
      window.open(url, '_blank');
    }
  }

  @action
  async favourite() {
    if (!this.session.isAuthenticated) {
      try {
        await this.confirm.prompt(this.l10n.t('Please login to add a session to your personal schedule.'));
        this.router.transitionTo('login');
      } catch (e) {
        if (e) {
          console.error(e);
        }
      }
      return;
    }

    const { session } = this.args;
    const favourite = session.belongsTo('favourite').value();
    if (favourite) {
      await favourite.destroyRecord();
    } else {
      const fav = await this.store.createRecord('user-favourite-session', {
        session
      });
      await fav.save();
    }
  }
}
