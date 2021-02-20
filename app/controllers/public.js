import classic from 'ember-classic-decorator';
import { computed, action } from '@ember/object';
import Controller from '@ember/controller';
import moment from 'moment';
import { tracked } from '@glimmer/tracking';

@classic
export default class PublicController extends Controller {
  queryParams = ['side_panel', 'video_dialog'];

  side_panel = null;
  video_dialog = null;

  @tracked activeSession = this.router.currentRoute.queryParams.sessionType ? this.router.currentRoute.queryParams.sessionType : null;

  @computed('model.socialLinks')
  get twitterLink() {
    return this.model.socialLinks.findBy('isTwitter', true);
  }

  @computed('session.currentRouteName')
  get smallLead() {
    return this.session.currentRouteName && this.session.currentRouteName !== 'public.index';
  }

  @computed('model.startsAt', 'model.endsAt')
  get displayEndDate() {
    return !moment.tz(this.model.startsAt, this.model.timezone)
      .isSame(moment.tz(this.model.endsAt, this.model.timezone), 'date');
  }

  @computed('session.currentRouteName')
  get displaySideMenu() {
    return this.session.currentRouteName && this.session.currentRouteName !== 'public.cfs.new-session' && this.session.currentRouteName !== 'public.cfs.new-speaker' && this.session.currentRouteName !== 'public.cfs.edit-speaker' && this.session.currentRouteName !== 'public.cfs.edit-session' && this.session.currentRouteName !== 'public.cfs.view-speaker' && this.session.currentRouteName !== 'public.cfs.view-session';
  }

  @computed('model.locationName', 'model.online')
  get headerLocation() {
    if (this.model.locationName && this.model.online) {
      return this.l10n.t('Online and In-Person Event at') + ' ' + this.model.locationName;
    } else if (this.model.online) {
      return this.l10n.t('Online Event');
    } else if (this.model.locationName) {
      return this.model.locationName;
    } else {
      return this.l10n.t('Location to be announced');
    }
  }

  @action
  toLogin() {
    if (!this.authManager.currentUser) {
      this.transitionToRoute('login');
    }
  }

  @action
  transition(sessionType) {
    if (this.activeSession === sessionType.name) {
      this.set('activeSession', null);
      this.router.transitionTo('public.sessions', { queryParams: { 'sessionType': null  } });
    } else {
      this.set('activeSession', sessionType.name);
      this.router.transitionTo('public.sessions', { queryParams: { 'sessionType': sessionType.name } });
    }
  }

  @action
  closeVideoDialog() {
    this.router.transitionTo('public', { queryParams: { video_dialog: null } });
  }
}
