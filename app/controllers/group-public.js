import classic from 'ember-classic-decorator';
import { computed  } from '@ember/object';
import Controller from '@ember/controller';

@classic
export default class GroupPublicController extends Controller {
  @computed('model.followedGroups', 'model.group')
  get follower() {
    return  this.model.followedGroups.toArray().filter(userFollowGroup => userFollowGroup.group.get('id') === this.model.group.id)[0];
  }

  @computed('model.group.followers')
  get followers() {
    return  (this.session.isAuthenticated && this.model.group.followers) ? this.model.group.followers.toArray() : [];
  }
}
