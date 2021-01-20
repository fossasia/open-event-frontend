import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';

@classic
export default class CreateRoute extends Route {
  titleToken() {
    return this.l10n.t('Create Group');
  }

  async model() {
    return {
      group: await this.store.createRecord('group', {
        user: this.authManager.currentUser
      })
    };
  }
}
