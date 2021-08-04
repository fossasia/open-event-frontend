import classic from 'ember-classic-decorator';
import { orderBy } from 'lodash-es';
import { computed, action } from '@ember/object';
import Controller from '@ember/controller';
import moment from 'moment';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { levels } from 'open-event-frontend/utils/dictionary/levels';

@classic
export default class PublicController extends Controller {
  @service event;
  @service errorHandler;

  queryParams = ['side_panel', 'video_dialog'];

  side_panel = null;
  video_dialog = null;

  @tracked activeSession = this.router.currentRoute.queryParams.sessionType ? this.router.currentRoute.queryParams.sessionType.split(',') : [];

  @tracked activeSessionLevel = this.router.currentRoute.queryParams.level ? this.router.currentRoute.queryParams.level.split(',') : [];

  @tracked activeRoom = this.router.currentRoute.queryParams.room ? this.router.currentRoute.queryParams.room.split(',') : [];

  @tracked activeTrack = this.router.currentRoute.queryParams.track ? this.router.currentRoute.queryParams.track.split(',') : [];

  @tracked hasStreams = null;
  @tracked canAccess = null;

  @tracked levels = orderBy(levels, 'position');

  @computed('model.socialLinks')
  get twitterLink() {
    return this.model.socialLinks.findBy('isTwitter', true);
  }

  @computed('model.customForms')
  get hasSessionLevel() {
    let hasLevel = false;
    this.model.customForms.forEach(cf => {
      if (cf.form === 'session' && cf.name === 'Level' && cf.isIncluded) {
        hasLevel = true;
      }
    });
    return hasLevel;
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
  async follow() {
    if (!this.session.isAuthenticated) {
      try {
        await this.confirm.prompt(this.l10n.t('Please login to follow a group.'));
        this.router.transitionTo('login');
      } catch (e) {
        if (e) {
          console.error(e);
        }
      }
      return;
    }
    const group = await this.model.group;
    const follower = group.belongsTo('follower').value();
    try {
      if (follower) {
        await follower.destroyRecord();
        this.notify.info(this.l10n.t('You have successfully unfollowed this group.'));
      } else {
        try {
          const heading = this.l10n.t('By following this group you accept that:');
          const content =  this.l10n.t('1. You will receive announcement emails for events of this group.') + '<br/>'
            + this.l10n.t('2. You share your email with the group owners and organizers.') + '<br/>'
            + this.l10n.t('3. All group members will be able to see your public profile image and name.') + '<br/><br/>'
            + this.l10n.t('Do you want to proceed?');

          const options = {
            denyText     : 'Cancel',
            denyColor    : 'red',
            approveText  : 'Yes, follow this group',
            approveColor : 'green',
            extra        : content
          };
          await this.confirm.prompt(heading, options);
        } catch {
          return;
        }
        const followGroup = await this.store.createRecord('user-follow-group', {
          group
        });
        await followGroup.save();
        this.notify.success(this.l10n.t('You have successfully followed this group.'));
      }
    } catch (e) {
      this.errorHandler.handle(e);
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
  removeActiveSessionLevel() {
    this.activeSessionLevel = [];
  }

  removeActiveClass(name) {
    const activeEls = document.querySelectorAll(`.${name}.link-item.active`);
    activeEls.forEach(el => {
      el.classList.remove('active');
    });
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
  sessionLevelFilter(level) {
    if (this.activeSessionLevel.includes(level)) {
      this.activeSessionLevel = this.activeSessionLevel.filter(val => val !== level);
    } else {
      this.activeSessionLevel = [...this.activeSessionLevel, level];
    }
    this.router.transitionTo('public.sessions', { queryParams: { 'level': this.activeSessionLevel } });
  }

  @action
  applyFilter(value, filterType) {
    const params = this.router.currentRoute.queryParams;
    if (!params.track) {
      this.activeTrack = [];
    }
    if (!params.room) {
      this.activeRoom = [];
    }
    if (!params.sessionType) {
      this.activeSession = [];
    }
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
