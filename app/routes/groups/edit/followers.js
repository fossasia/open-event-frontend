import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';
import EmberTableRouteMixin from 'open-event-frontend/mixins/ember-table-route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

@classic
export default class FollowersRoute extends Route.extend(EmberTableRouteMixin, AuthenticatedRouteMixin) {
  titleToken(model) {
    const groupTitle = model.group.name;
    return groupTitle.concat(' - Followers');
  }

  async model(params) {
    this.set('params', params);
    let queryString = {
      'include'      : 'user',
      'page[size]'   : params.per_page || 100,
      'page[number]' : params.page || 1
    };
    queryString = this.applySortFilters(queryString, params);
    const group = await this.store.findRecord('group', params.group_id);
    const followers = await this.asArray(group.query('followers', queryString));
    return {
      followers,
      group
    };
  }

  afterModel(model) {
    if (this.authManager.currentUser.email !== model.group.user.get('email')  && !this.authManager.currentUser.isAdmin) {
      this.transitionTo('index');
    }
  }
}
