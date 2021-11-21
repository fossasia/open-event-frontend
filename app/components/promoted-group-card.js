import Component from '@ember/component';
import { action, computed } from '@ember/object';
import { inject as service } from '@ember/service';
import classic from 'ember-classic-decorator';

@classic
export default class PromotedGroupCard extends Component {
@service event;
@service errorHandler;

@computed
get follower() {
  return this.followedGroups.toArray().filter(userFollowGroup => userFollowGroup.group.get('id') === this.group.id)[0];
}

@computed
get followers() {
  return this.group.followers ? this.group.followers.toArray() : [];
}

@computed('follower')
get isFollowed() {
  return !!this.follower;
}

@action
async follow() {
  const { group } = this;
  try {
    if (this.isFollowed) {
      await this.follower.destroyRecord();
      this.set('follower', null);
      this.set('isFollowed', false);
      this.group.followerCount--;
      this.notify.info(
        this.l10n.t('You have successfully unfollowed this group.')
      );
    } else {
      try {
        let heading = '';
        let content = '';
        let approveText = '';
        if (this.session.isAuthenticated === false) {
          heading = this.l10n.t('You need to be logged in to follow this group.');
          approveText = 'Login';
        } else {
          heading = this.l10n.t('By following this group you accept that:');
          content = this.l10n.t('1. You will receive announcement emails for events of this group.') + '<br/>'
  + this.l10n.t('2. You share your email with the group owners and organizers.') + '<br/>'
  + this.l10n.t('3. All group members will be able to see your public profile image and name.') + '<br/><br/>'
  + this.l10n.t('Do you want to proceed?');
          approveText = 'Yes, follow this group';
        }
        const options = {
          denyText     : 'Cancel',
          denyColor    : 'red',
          approveText,
          approveColor : 'green',
          extra        : content
        };
        await this.confirm.prompt(heading, options);
      } catch {
        return;
      }
      if (this.session.isAuthenticated === false) {
        this.router.transitionTo('login');
      } else {
        const followGroup = await this.store.createRecord('user-follow-group', {
          group,
          user: this.authManager.currentUser
        });
        await followGroup.save();
        this.set('isFollowed', true);
        this.set('follower', followGroup);
        this.group.followerCount++;
        this.followers.pushObject(followGroup);
        this.notify.success(this.l10n.t('You have successfully followed this group.'));
      }
    }
  } catch (e) {
    console.error(e);
    this.errorHandler.handle(e);
  }
}

@computed
get groupClass() {
  return this.isWide ? 'thirteen wide computer ten wide tablet sixteen wide mobile column ' + (!this.device.isMobile && 'rounded-l-none') : 'event fluid';
}

@computed('group')
get about() {
  if (this.group.about?.length > 50) {
    return this.group.about.slice(0, 50) + '...';
  }
  return this.group.about ? this.group.about : 'No information given about group.';
}
}
