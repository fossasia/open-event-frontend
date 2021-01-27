import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

@classic
export default class GroupRoute extends Route.extend(AuthenticatedRouteMixin) {

  async model() {
    return {
      filteredEvents: await this.authManager.currentUser.query('events', {
        include      : 'event-topic,event-sub-topic,event-type,speakers-call',
        'page[size]' : 25
      }),
      group: this.store.createRecord('group', {
        events: []
      })
    };

  }

  @action
  loading(transition) {
    transition.promise.finally(() => {
      if (this.controller) {
        this.controller.set('finishedLoading', true);
      }
    });
    return false;
  }
}
