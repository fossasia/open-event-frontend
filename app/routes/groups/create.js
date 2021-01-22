import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import Route from '@ember/routing/route';
import { hash } from 'rsvp';

@classic
export default class GroupRoute extends Route {

  async model() {
    return hash({
      filteredEvents: this.authManager.currentUser.query('events', {
        include      : 'event-topic,event-sub-topic,event-type,speakers-call',
        cache        : true,
        'page[size]' : 25
      })
    });
  }

  setupController(controller, model) {
    super.setupController(...arguments);
    controller.set('filteredEvents', model.filteredEvents);
    this.set('controller', controller);
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
