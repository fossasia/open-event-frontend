import classic from 'ember-classic-decorator';
import { computed, action } from '@ember/object';
import Controller from '@ember/controller';
import moment from 'moment-timezone';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

@classic
export default class PublicController extends Controller {
  @service event;
  @service errorHandler;

  queryParams = ['side_panel', 'video_dialog'];

  side_panel = null;
  video_dialog = null;

  @tracked hasStreams = null;
  @tracked canAccess = null;

  @tracked shown = false;
  @tracked currentRoom = null;

  @computed('model.socialLinks')
  get twitterLink() {
    return this.model.socialLinks.findBy('isTwitter', true);
  }

  @computed
  get vietnameseFontFamily() {
    return this.l10n.getLocale() === 'vi' ? 'font-family:Robota' : '';
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

  @computed
  get follower() {
    return this.followers.filter(userFollowGroup => userFollowGroup?.user.get('id') === this.authManager.currentUser.get('id'))[0];
  }

  @computed
  get followers() {
    return this.model.group.get('followers') ? this.model.group.get('followers').toArray() : [];
  }

  @computed
  get isFollowed() {
    return !!this.follower;
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
    try {
      if (this.isFollowed) {
        await this.follower.destroyRecord();
        this.set('follower', null);
        this.set('isFollowed', false);
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
        this.set('isFollowed', true);
        this.set('follower', followGroup);
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
  async showSidePanel() {
    await this.set('side_panel', null);
    await this.set('side_panel', true);
  }

  @action
  async showChatPanel() {
    if (this.shown) {
      this.shown = false;
      return;
    }
    if (this.authManager.currentUser?.isRocketChatRegistered) {
      this.shown = true;
      return;
    }
    try {
      const heading = this.l10n.t('Please confirm that you understand and agree to the conditions of using the chat!');

      const content =  this.l10n.t('If you join the event chat, your profile name and image will be visible to other attendees. Other event attendees can also contact you directly.') + '<br/><br/>'
        + this.l10n.t('You may change your chat name and chat profile picture by going to account settings on the chat page on the top left.') + ' '
        + this.l10n.t('You need to minimize the side panel to access it.') + ' '
        + this.l10n.t('The feature integration is still in Alpha stage and currently your profile on the {{appName}} account page and on the chat are not linked and can be independently edited.', { appName: this.settings.appName }) + ' '
        + this.l10n.t('When you change the chat settings you may receive additional email confirmations.') + '<br/><br/>'
        + this.l10n.t('Do you want to use the chat now?');

      const options = {
        denyText     : 'Cancel',
        denyColor    : 'red',
        approveText  : 'OK',
        approveColor : 'green',
        extra        : content
      };
      await this.confirm.prompt(heading, options);
      this.shown = true;
    } catch {
      this.shown = false;
    }
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

  @action
  async setupRoomChat(stream) {
    this.currentRoom = stream;
    this.shown = false;
  }
}
