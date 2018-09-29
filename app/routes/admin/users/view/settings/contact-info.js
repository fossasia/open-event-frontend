import Route from '@ember/routing/route';

export default Route.extend({
  model() {
    const currentUser = this.modelFor('admin.users.view');
    return {
      user: currentUser
    };
  }
});
