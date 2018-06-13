import Route from '@ember/routing/route';

export default Route.extend({
  titleToken() {
    switch (this.get('params.users_status')) {
      case 'active':
        return this.get('l10n').t('Active');
      case 'deleted':
        return this.get('l10n').t('Deleted');
    }
  },
  beforeModel(transition) {
    this._super(...arguments);
    const userState = transition.params[transition.targetName].users_status;
    if (!['all', 'deleted', 'active'].includes(userState)) {
      this.replaceWith('admin.users.view', userState);
    }
  },
  model() {
    return this.get('store').query('user', {
      'page[size]': 10
    });
  }
});
