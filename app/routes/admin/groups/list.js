import Route from '@ember/routing/route';
import EmberTableRouteMixin from 'open-event-frontend/mixins/ember-table-route';
import { capitalize } from 'lodash-es';

export default class extends Route.extend(EmberTableRouteMixin) {
    titleToken() {
        if (['live', 'deleted'].includes(this.router.currentRoute.attributes.group_status)) {
          return capitalize(this.router.currentRoute.attributes.group_status);
        } 
    }
}