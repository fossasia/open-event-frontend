import Component from '@ember/component';
import { computed, action } from '@ember/object';
import classic from 'ember-classic-decorator';
import FormMixin from 'open-event-frontend/mixins/form';
import moment from 'moment-timezone';
import { sortBy } from 'lodash-es';
import { inject as service } from '@ember/service';

@classic
export default class GroupView extends Component.extend(FormMixin) {

  @service errorHandler;

  @computed('events.[]', 'group.events.[]')
  get pastEvents() {
    return sortBy(this.group.events.toArray().filter(event => { return moment(event.endsAt) < moment()}), ['startsAt']).reverse();
  }

  @computed('events.[]', 'group.events.[]')
  get upcomingEvents() {
    return sortBy(this.group.events.toArray().filter(event => { return moment(event.endsAt) > moment()}), ['startsAt']).reverse();
  }

  @computed('follower')
  get isFollowed() {
    return !!this.follower;
  }

  @action
  async toggleFollow() {
    const { group } = this;
    try {
      if (this.isFollowed) {
        await this.follower.destroyRecord();
        this.set('follower', null);
        this.set('isFollowed', false);
        this.group.followerCount--;
        this.set('followers', this.followers.filter(follower => follower.user.get('id') !== this.authManager.currentUser.id));
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
            content =  this.l10n.t('1. You will receive announcement emails for events of this group.') + '<br/>'
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

          this.confirm.prompt(heading, options);
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

  @action
  shareEvent(event) {
    this.set('eventToShare', event);
    this.set('isShareModalOpen', true);
  }
}
