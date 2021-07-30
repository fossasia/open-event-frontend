import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';
import { hash } from 'rsvp';

@classic
export default class IndexRoute extends Route {
  titleToken(model) {
    const groupTitle = model.group.name;
    return groupTitle.concat(' - View');
  }

  model(params) {

    return hash({
      group: this.store.findRecord('group', params.group_id, {
        include: 'events,follower,user'
      })
    });
  }
}
