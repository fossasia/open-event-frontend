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
    const filterOptions = [];
    if (params.search) {
      filterOptions.push({
        or: [{
          name : 'user',
          op   : 'has',
          val  : {
            name : 'email',
            op   : 'ilike',
            val  : `%${params.search}%`
          }
        },
        {
          name : 'user',
          op   : 'has',
          val  : {
            name : 'public-name',
            op   : 'ilike',
            val  : `%${params.search}%`
          }
        }
        ] });
    }
    let queryString = {
      'include'      : 'user',
      filter         : filterOptions,
      'page[size]'   : params.per_page || 100,
      'page[number]' : params.page || 1
    };
    queryString = this.applySortFilters(queryString, params);
    const group = await this.store.findRecord('group', params.group_id, {
      include: 'events,user'
    });
    const followers = await this.asArray(group.query('followers', queryString));
    return {
      followers,
      group
    };
  }
}
