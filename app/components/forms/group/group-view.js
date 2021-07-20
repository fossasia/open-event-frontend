import Component from '@ember/component';
import { computed, action } from '@ember/object';
import classic from 'ember-classic-decorator';
import FormMixin from 'open-event-frontend/mixins/form';
import moment from 'moment';
import { sortBy } from 'lodash-es';

@classic
export default class GroupView extends Component.extend(FormMixin) {

  @computed('events.[]', 'group.events.[]')
  get pastEvents() {
    return sortBy(this.group.events.toArray().filter(event => { return moment(event.endsAt) < moment()}), ['startsAt']).reverse();
  }

  @computed('events.[]', 'group.events.[]')
  get upcomingEvents() {
    return sortBy(this.group.events.toArray().filter(event => { return moment(event.endsAt) > moment()}), ['startsAt']).reverse();
  }

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

  shareEvent(event) {
    this.set('eventToShare', event);
    this.set('isShareModalOpen', true);
  }
}
