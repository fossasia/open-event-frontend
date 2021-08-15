import Route from '@ember/routing/route';
import { action } from '@ember/object';
import EmberTableRouteMixin from 'open-event-frontend/mixins/ember-table-route';

export default class extends Route.extend(EmberTableRouteMixin) {
  titleToken() {
    return this.l10n.t('Following');
  }

  async model(params) {
    this.set('params', params);
    const filterOptions = [{
      name : 'followers',
      op   : 'any',
      val  : {
        name : 'user',
        op   : 'has',
        val  : {
          name : 'id',
          op   : 'eq',
          val  : this.authManager.currentUser.id
        }
      }
    }
    ];
    return this.infinity.model('group', {
      include      : 'follower,user,events',
      filter       : filterOptions,
      perPage      : 10,
      startingPage : 1,
      perPageParam : 'page[size]',
      pageParam    : 'page[number]'
    });
  }

  @action
  refreshRoute() {
    this.refresh();
  }
}
