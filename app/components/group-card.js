import Component from '@ember/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class GroupCard extends Component {
  @service event;
  @service errorHandler;

  @action
  async follow() {
    const { group } = this;
    const follower = group.belongsTo('follower').value();
    try {
      if (follower) {
        await follower.destroyRecord();
        this.notify.info(
          this.l10n.t('You have successfully unfollowed this group.')
        );
      } else {
        const followGroup = await this.store.createRecord('user-follow-group', {
          group
        });
        await followGroup.save();
        this.notify.success(
          this.l10n.t('You have successfully followed this group.')
        );
      }
    } catch (e) {
      this.errorHandler.handle(e);
    }
  }
}
