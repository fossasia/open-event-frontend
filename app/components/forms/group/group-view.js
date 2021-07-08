import Component from '@ember/component';
import { action } from '@ember/object';
import classic from 'ember-classic-decorator';
import FormMixin from 'open-event-frontend/mixins/form';

@classic
export default class GroupView extends Component.extend(FormMixin) {
  @action
  shareEvent() {}

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
        this.notify.success(this.l10n.t('You have successfully followed this group.'));
      }
    } catch (e) {
      this.errorHandler.handle(e);
    }
  }
}
