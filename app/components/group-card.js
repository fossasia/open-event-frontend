import Component from '@ember/component';
import { action, computed } from '@ember/object';
import { inject as service } from '@ember/service';
import classic from 'ember-classic-decorator';

@classic
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
      }
    } catch (e) {
      this.errorHandler.handle(e);
    }
  }

  @computed('group')
  get about() {
    if (this.group.about?.length > 350) {
      return this.group.about.slice(0, 350) + '...';
    }
    return this.group.about;
  }
}
