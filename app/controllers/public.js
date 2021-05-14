import classic from 'ember-classic-decorator';
import { computed, action } from '@ember/object';
import Controller from '@ember/controller';
import moment from 'moment';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

@classic
export default class PublicController extends Controller {
  @service event;

  queryParams = ['side_panel', 'video_dialog'];

  side_panel = null;
  video_dialog = null;

  @tracked activeSession = this.router.currentRoute.queryParams.sessionType ? this.router.currentRoute.queryParams.sessionType.split(',') : [];

  @tracked activeRoom = this.router.currentRoute.queryParams.room ? this.router.currentRoute.queryParams.room.split(',') : [];

  @tracked activeTrack = this.router.currentRoute.queryParams.track ? this.router.currentRoute.queryParams.track.split(',') : [];

  @tracked hasStreams = null;
  @tracked canAccess = null;

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
    } else {
      const el = document.querySelector('#tickets');
      window.scroll({ top: el?.getBoundingClientRect().top, left: 0, behavior: 'smooth' });
      document.querySelectorAll('.scroll').forEach(node => {
        node.classList.remove('active');
      });
      this.transitionToRoute(this.session.currentRouteName, { queryParams: { video_dialog: null } });
    }
  }

  @action
  removeActiveSession() {
    this.activeSession = [];
  }

  @action
  sessionFilter(name) {
    if (this.activeSession.includes(name)) {
      this.activeSession = this.activeSession.filter(session => session !== name);
    } else {
      this.activeSession = [...this.activeSession, name];
    }
    this.router.transitionTo('public.sessions', { queryParams: { 'sessionType': this.activeSession } });
  }

  @action
  applyFilter(value, filterType) {
    value = value + ':';
    if (filterType === 'room') {
      if (this.activeRoom.includes(value)) {
        this.activeRoom = this.activeRoom.filter(room => room !== value);
      } else {
        this.activeRoom = [...this.activeRoom, value];
      }
      this.router.transitionTo('public.sessions', { queryParams: { 'room': this.activeRoom } });
    } else {
      if (this.activeTrack.includes(value)) {
        this.activeTrack = this.activeTrack.filter(track => track !== value);
      } else {
        this.activeTrack = [...this.activeTrack, value];
      }
      this.router.transitionTo('public.sessions', { queryParams: { 'track': this.activeTrack } });
    }
  }

  @action
  async showSidePanel() {
    await this.set('side_panel', null);
    await this.set('side_panel', true);
  }

  @action
  closeVideoDialog() {
    this.router.transitionTo('public', { queryParams: { video_dialog: null } });
  }

  @action
  async setup() {
    const streamStatus = await this.event.hasStreams(this.model.id);
    const { exists, can_access } = streamStatus;
    this.hasStreams = exists;
    this.canAccess = can_access;
  }
}
